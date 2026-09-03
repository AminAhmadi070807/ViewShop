import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SmsSettingService } from './sms-setting.service';
import { SmsSettingDto } from './dto/sms-setting.dto';
import { Validate } from '../../common/validations/validate.dto';

@Controller()
export class SmsSettingController {
  constructor(private readonly smsSettingService: SmsSettingService) {}

  @MessagePattern('SETTING:SMS:CREATE')
  create(@Payload() data: SmsSettingDto) {
    return this.smsSettingService.create(data);
  }

  @MessagePattern('SETTING:SMS:FIND')
  findAll() {
    return this.smsSettingService.findAll();
  }

  @MessagePattern('SETTING:SMS:ONE')
  findOne(@Payload() data: Validate) {
    return this.smsSettingService.findOne(data.id);
  }

  @MessagePattern('SETTING:SMS:DELETE')
  remove(@Payload() data: Validate) {
    return this.smsSettingService.remove(data.id);
  }
}
