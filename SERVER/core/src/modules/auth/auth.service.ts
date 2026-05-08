import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthLoginDto, AuthRegisterDto, AuthValidateDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { UserRoleEnum } from '../../common/enums/users/user.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';
import {
  AuthInterface,
  AuthTokenInterface,
  AuthValidateInterface,
} from '../../common/interfaces/auth.interface';
import { User } from '../users/entities/user.entity';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateToken(
    id: string,
    role: UserRoleEnum,
    secret: string,
  ): AuthTokenInterface {
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

  async register(data: AuthRegisterDto) {
    // const user: UserOneInterface = await this.usersService.create(data);
  }

  async validateRefreshToken(
    data: AuthValidateDto,
  ): Promise<AuthValidateInterface> {
    const auths: Auth[] = await this.authRepository.find({
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
    for (const auth of auths) {
      const isToken: boolean = await bcrypt.compare(data.secret, auth.secret);
      console.log(isToken);

      isValidTokenArray.push(isToken);
    }

    if (isValidTokenArray.includes(true)) {
      return {
        body: null,
        message: 'Refresh token is valid.',
        status: HttpStatus.OK,
      };
    }

    throw new CustomException(
      'The Refresh Token is not valid.',
      HttpStatus.UNAUTHORIZED,
    );
  }

  async login(data: AuthLoginDto): Promise<AuthInterface> {
    const user: User | null = await this.userRepository.findOneBy({
      phone: data.phone,
    });

    if (!user) throw new CustomException(`User not found`, 404);

    // validate password
    const isPassword: boolean = await bcrypt.compare(
      data.password,
      user.password,
    );

    if (!isPassword) throw new CustomException(`User not found.`, 404);

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
      message: 'Authentication was successfully.',
      body: tokens,
    };
  }
}
