import { Injectable } from '@nestjs/common';
import { AuthLoginDto, AuthRegisterDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
// import { UserOneInterface } from '../../common/interfaces/user.interface';
import { UserRoleEnum } from '../../common/enums/users/user.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';
import { AuthInterface } from '../../common/interfaces/auth.interface';
import { UserOneInterface } from '../../common/interfaces/user.interface';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateToken(id: string, role: UserRoleEnum): AuthInterface {
    // user access token
    const access_token = this.jwtService.sign(
      { userId: id, role },
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

  async login(data: AuthLoginDto) {
    const user: UserOneInterface = await this.usersService.findByPhone(
      data.phone,
    );

    if (!user) {
      throw new CustomException('User not found', 404);
    }

    const isPassword: boolean = await bcrypt.compare(
      data.password,
      user.body.password,
    );

    if (!isPassword) {
      throw new CustomException('User not found', 404);
    }

    const tokens: AuthInterface = this.generateToken(
      user.body.id,
      user.body.role,
    );

    const hashRefreshToken: string = bcrypt.hashSync(tokens.refresh_token, 12);

    // console.log(data.userAgent);

    // const authToken: Auth = this.authRepository.create({
    //   token: hashRefreshToken,
    //   user: user,
    //   // device: data
    // })
  }
}
