import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SmsSettingService } from './sms-setting.service';
import { SmsSettingDto } from './dto/sms-setting.dto';

@Controller()
export class SmsSettingController {
  constructor(private readonly smsSettingService: SmsSettingService) {}

  @MessagePattern('createSmsSetting')
  create(@Payload() createSmsSettingDto: SmsSettingDto) {
    return this.smsSettingService.create(createSmsSettingDto);
  }

  @MessagePattern('findAllSmsSetting')
  findAll() {
    return this.smsSettingService.findAll();
  }

  @MessagePattern('findOneSmsSetting')
  findOne(@Payload() id: number) {
    return this.smsSettingService.findOne(id);
  }

  @MessagePattern('removeSmsSetting')
  remove(@Payload() id: number) {
    return this.smsSettingService.remove(id);
  }
}
