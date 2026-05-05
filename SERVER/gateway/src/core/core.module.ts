import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { ClientsModuleConfig } from '../common/config/client.config';
import { ClientsModule } from '@nestjs/microservices';
import { UsersController } from './controllers/users/user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessTokenModuleConfig } from '../common/config/jwt.config';

@Module({
  providers: [CoreService],
  imports: [
    ClientsModule.registerAsync(ClientsModuleConfig),
    PassportModule,
    JwtModule.registerAsync(JwtAccessTokenModuleConfig),
  ],
  controllers: [UsersController],
})
export class CoreModule {}
