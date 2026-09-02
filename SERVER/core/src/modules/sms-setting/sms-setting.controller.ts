import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SmsSettingService } from './sms-setting.service';
import { SmsSettingDto } from './dto/sms-setting.dto';

@Controller()
export class SmsSettingController {
  constructor(private readonly smsSettingService: SmsSettingService) {}

  @MessagePattern('SETTING:SMS:CREATE')
  create(@Payload() createSmsSettingDto: SmsSettingDto) {
    return this.smsSettingService.create(createSmsSettingDto);
  }

  @MessagePattern('SETTING:SMS:FIND')
  findAll() {
    return this.smsSettingService.findAll();
  }

  @MessagePattern('SETTING:SMS:ONE')
  findOne(@Payload() id: number) {
    return this.smsSettingService.findOne(id);
  }

  @MessagePattern('SETTING:SMS:DELETE')
  remove(@Payload() id: number) {
    return this.smsSettingService.remove(id);
  }
}
