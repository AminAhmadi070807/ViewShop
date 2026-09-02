import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SmsSettingService } from './sms-setting.service';
import { CreateSmsSettingDto } from './dto/create-sms-setting.dto';
import { UpdateSmsSettingDto } from './dto/update-sms-setting.dto';

@Controller()
export class SmsSettingController {
  constructor(private readonly smsSettingService: SmsSettingService) {}

  @MessagePattern('createSmsSetting')
  create(@Payload() createSmsSettingDto: CreateSmsSettingDto) {
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

  @MessagePattern('updateSmsSetting')
  update(@Payload() updateSmsSettingDto: UpdateSmsSettingDto) {
    return this.smsSettingService.update(updateSmsSettingDto.id, updateSmsSettingDto);
  }

  @MessagePattern('removeSmsSetting')
  remove(@Payload() id: number) {
    return this.smsSettingService.remove(id);
  }
}
