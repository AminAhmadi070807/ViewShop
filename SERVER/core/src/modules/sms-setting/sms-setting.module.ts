import { Module } from '@nestjs/common';
import { SmsSettingService } from './sms-setting.service';
import { SmsSettingController } from './sms-setting.controller';

@Module({
  controllers: [SmsSettingController],
  providers: [SmsSettingService],
})
export class SmsSettingModule {}
