import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { User } from '../users/entities/user.entity';
import { SmsService } from '../../common/services/sms.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, SmsService],
  imports: [TypeOrmModule.forFeature([Auth, User])],
})
export class AuthModule {}
