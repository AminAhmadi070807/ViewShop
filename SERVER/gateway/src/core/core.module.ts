import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { ClientsModuleConfig } from '../common/config/client.config';
import { ClientsModule } from '@nestjs/microservices';
import { UsersController } from './controllers/users/user.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessTokenModuleConfig } from '../common/config/jwt.config';
import { JwtAccessTokenStrategy } from '../common/strategies/jwt.access.token.strategy';
import { JwtRefreshTokenStrategy } from '../common/strategies/jwt.refresh.token.strategy';
import { AddressController } from './controllers/address/address.controller';
import { MediaController } from './controllers/uploads/uploads.controller';

@Module({
  providers: [CoreService, JwtRefreshTokenStrategy, JwtAccessTokenStrategy],
  imports: [
    ClientsModule.registerAsync(ClientsModuleConfig),
    PassportModule,
    JwtModule.registerAsync(JwtAccessTokenModuleConfig),
  ],
  controllers: [
    UsersController,
    AuthController,
    AddressController,
    MediaController,
  ],
  exports: [CoreService],
})
export class CoreModule {}
