import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { ClientsModuleConfig } from '../common/config/client.config';
import { ClientsModule } from '@nestjs/microservices';
import { UsersController } from './controllers/users/user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessTokenModuleConfig } from '../common/config/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAccessTokenAuthGuard } from '../common/guards/auth.guard';
import { JwtAccessTokenStrategy } from '../common/strategies/jwt.access.token.strategy';
import { AuthController } from './controllers/auth/auth.controller';

@Module({
  providers: [
    CoreService,
    JwtAccessTokenAuthGuard,
    JwtAccessTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAccessTokenAuthGuard,
    },
  ],
  imports: [
    ClientsModule.registerAsync(ClientsModuleConfig),
    PassportModule.register({
      defaultStrategy: 'jwt-access-token-guard',
    }),
    JwtModule.registerAsync(JwtAccessTokenModuleConfig),
  ],
  controllers: [UsersController, AuthController],
})
export class CoreModule {}
