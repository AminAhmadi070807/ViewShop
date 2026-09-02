import { Module } from '@nestjs/common';
import { SmsSettingService } from './sms-setting.service';
import { SmsSettingController } from './sms-setting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsSetting } from './entities/sms-setting.entity';

@Module({
  controllers: [SmsSettingController],
  providers: [SmsSettingService],
  imports: [TypeOrmModule.forFeature([SmsSetting])],
  exports: [TypeOrmModule],
})
export class SmsSettingModule {}
