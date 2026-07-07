import { HttpStatus, Injectable } from '@nestjs/common';
import {
  AuthLoginDto,
  AuthRegisterDto,
  AuthValidateDto,
  AuthVerifyOtp,
} from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { UserRoleEnum } from '../../common/enums/users/user.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';
import {
  AuthInterface,
  AuthRegisterInterface,
  AuthTokenInterface,
  AuthValidateInterface,
  VerifyTokenInterface,
} from '../../common/interfaces/auth.interface';
import { User } from '../users/entities/user.entity';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import bcrypt from 'bcrypt';
import { SmsService } from '../../common/services/sms.service';
import crypto from 'crypto';
import { RedisService } from '../../common/services/redis.service';
import { statusMessages } from '../../common/message/message.status';

interface SmsInterface {
  status: HttpStatus;
  message: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly smsService: SmsService,
    private readonly redisService: RedisService,
  ) {}

  generateToken(id: string, role: UserRoleEnum, secret: string) {
    // user access token
    const access_token = this.jwtService.sign(
      {
        userId: id,
        role: role,
      },
      {
        expiresIn: this.configService.get<StringValue>(
          'CORE_JWT_ACCESS_TOKEN_EXPIRE_IN',
        ) as StringValue,
        secret: this.configService.get<string>(
          'CORE_JWT_ACCESS_TOKEN_SECRET_KEY',
        ),
      },
    );

    // user refresh token
    const refresh_token: string = this.jwtService.sign(
      {
        userId: id,
        role,
        secret,
      },
      {
        expiresIn: this.configService.get<StringValue>(
          'CORE_JWT_REFRESH_TOKEN_EXPIRE_IN',
        ) as StringValue,
        secret: this.configService.get<string>(
          'CORE_JWT_REFRESH_TOKEN_SECRET_KEY',
        ),
      },
    );

    return {
      access_token,
      refresh_token,
    };
  }

  // payload otp data
  private payloadOtp(payload: string): Map<string, string> {
    const items: string[] = payload.split('___');

    const data: Map<string, string> = new Map();

    for (const item of items) {
      const result: string[] = item.split(':=:');

      data.set(result[0], result[1]);
    }

    return data;
  }

  // register user
  async register(data: AuthRegisterDto) {
    try {
      // find user with phone number from database
      const existing: User | null = await this.userRepository.findOneBy({
        phone: data.phone,
        verified: true,
      });

      // send conflict exception
      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const ttl: number = await this.redisService.ttl(data.phone);

      // was a ttl phone number send remaining ttl
      if (ttl > 0) {
        // get route from redis with phone number
        const route: string = (await this.redisService.get(
          data.phone,
        )) as string;
        // send response to client
        return {
          status: HttpStatus.OK,
          message: statusMessages.fa['409'],
          body: {
            route,
            ttl,
          },
        };
      }

      // random otp code
      const randomCode: number = crypto.randomInt(100000, 999999);

      // send otp code to user by sms service
      const sms: SmsInterface = await this.smsService.Mediana({
        phone: data.phone,
        code: `${randomCode}`,
      });

      // hashed user password
      const hashedPassword: string = await bcrypt.hash(data.password, 12);
      // random user verify route
      const randomRoute: string = crypto.randomUUID();

      // To send sms was successfully send response to client
      if (sms.status === HttpStatus.OK) {
        return new CustomException(sms.message, sms.status);
      }

      // set data in redis
      await this.redisService.set(
        randomRoute,
        `phone:=:${data.phone}___password:=:${hashedPassword}}___fullName:=:${data.fullName}___otp:=:${randomCode}`,
        180,
      );
      await this.redisService.set(data.phone, randomRoute, 180);

      // send request
      return {
        status: HttpStatus.OK,
        message: 'The otp was send successfully.',
        body: {
          route: randomRoute,
          ttl: 180,
        },
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  // verify otp code
  async verifyOtp(data: AuthVerifyOtp) {
    try {
      const result: string | null = await this.redisService.get(data.route);

      if (!result) return new CustomException(statusMessages.fa['400'], 400);

      const map: Map<string, string> = this.payloadOtp(result);

      const isOtpCode: boolean = map.get('otp') === data.otp;

      if (!isOtpCode) return new CustomException(statusMessages.fa['400'], 400);

      await this.redisService.ddl(data.route);
      await this.redisService.ddl(<string>map.get('phone'));

      const user: User = this.userRepository.create({
        verified: true,
        role: UserRoleEnum.USER,
        fullName: map.get('fullName'),
        phone: map.get('phone'),
        password: map.get('password'),
      });

      const saveUser: User = await this.userRepository.save(user);

      const secret: string = crypto.randomUUID();

      const tokens = this.generateToken(saveUser.id, saveUser.role, secret);

      const hashRefreshToken = await bcrypt.hash(tokens.refresh_token, 12);

      const token: Auth = this.authRepository.create({
        user,
        token: hashRefreshToken,
        secret: await bcrypt.hash(secret, 12),
      });

      await this.authRepository.save(token);

      return {
        status: HttpStatus.OK,
        message: statusMessages.fa.AUTH['201'],
        body: tokens,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  // verify token
  async verifyToken(data: AuthValidateDto) {
    try {
      const tokens: Auth[] = await this.authRepository.find({
        where: {
          user: { id: data.userId },
        },
        order: {
          id: 'DESC',
        },
        relations: ['user'],
      });

      // user the right token
      let userToken: Auth | null = null;

      // find validate token array
      for (const token of tokens) {
        const isToken = await bcrypt.compare(data.secret, token.secret);

        if (isToken) userToken = token;
      }

      if (!userToken) return new CustomException(statusMessages.fa['401'], 401);

      const access_token: string = this.jwtService.sign(
        {
          userId: data.userId,
          role: userToken.user.role,
        },
        {
          expiresIn: this.configService.get<StringValue>(
            'CORE_JWT_ACCESS_TOKEN_EXPIRE_IN',
          ) as StringValue,
          secret: this.configService.get<string>(
            'CORE_JWT_ACCESS_TOKEN_SECRET_KEY',
          ),
        },
      );

      return {
        status: HttpStatus.OK,
        message: statusMessages.fa['200'],
        body: {
          access_token,
        },
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  // validation refresh token
  async validateRefreshToken(data: AuthValidateDto) {
    const tokens: Auth[] = await this.authRepository.find({
      where: {
        user: { id: data.userId },
      },
      order: {
        id: 'DESC',
      },
    });

    // token validate boolean array
    const isValidTokenArray: boolean[] = [];

    // find validate token array
    for (const token of tokens) {
      const isToken: boolean = await bcrypt.compare(data.secret, token.secret);

      isValidTokenArray.push(isToken);
    }

    // validation tokens array
    if (isValidTokenArray.includes(true)) {
      return {
        body: null,
        message: statusMessages.fa['204'],
        status: HttpStatus.OK,
      };
    }

    throw new CustomException(statusMessages.fa['401'], 401);
  }

  // login user
  async login(data: AuthLoginDto) {
    try {
      // find user
      const user: User | null = await this.userRepository.findOneBy({
        phone: data.phone,
      });

      if (!user) return new CustomException(statusMessages.fa['404'], 404);

      // validate password
      const isPassword: boolean = await bcrypt.compare(
        data.password,
        user.password,
      );

      if (!isPassword) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      // create new secret key
      const secret: string = crypto.randomUUID();

      // create user refresh & access tokens
      const tokens: AuthTokenInterface = this.generateToken(
        user.id,
        user.role,
        secret,
      );

      // hashed refresh token
      const hashRefreshToken: string = await bcrypt.hash(
        tokens.refresh_token,
        12,
      );

      // hashed secret key
      const hashSecret = bcrypt.hashSync(secret, 12);

      // create new token
      const token: Auth = this.authRepository.create({
        user,
        token: hashRefreshToken,
        secret: hashSecret,
      });

      // save token in database
      await this.authRepository.save(token);

      return {
        status: HttpStatus.OK,
        message: statusMessages.fa.AUTH['200'],
        body: tokens,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  // logout user
  async logout(data: AuthValidateDto) {
    try {
      // get user tokens
      const tokens: Auth[] = await this.authRepository.find({
        where: {
          user: { id: data.userId },
        },
      });

      for (const token of tokens) {
        const validToken: boolean = await bcrypt.compare(
          data.secret,
          token.secret,
        );

        // remove user token
        if (validToken) {
          await this.authRepository.delete(token.id);
          break;
        }
      }

      return {
        status: HttpStatus.NO_CONTENT,
        message: statusMessages.fa['204'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
