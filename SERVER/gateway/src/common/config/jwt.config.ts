import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';

export const JwtAccessTokenModuleConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    secret: config.get<string>('CORE_JWT_ACCESS_TOKEN_SECRET_KEY'),
    signOptions: {
      expiresIn: config.get<StringValue>('CORE_JWT_REFRESH_TOKEN_EXPIRE_IN'),
    },
    global: true,
  }),
  inject: [ConfigService],
};

export const JwtRefreshTokenModuleConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    secret: config.get<string>('CORE_JWT_REFRESH_TOKEN_SECRET_KEY'),
    signOptions: {
      expiresIn: config.get<StringValue>('CORE_JWT_REFRESH_TOKEN_EXPIRE_IN'),
    },
    global: true,
  }),
  inject: [ConfigService],
};
