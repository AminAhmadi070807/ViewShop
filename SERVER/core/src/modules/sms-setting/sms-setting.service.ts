import { Injectable } from '@nestjs/common';
import { SmsSettingDto } from './dto/sms-setting.dto';

@Injectable()
export class SmsSettingService {
  create(data: SmsSettingDto) {
    return 'This action adds a new smsSetting';
  }

  findAll() {
    return `This action returns all smsSetting`;
  }

  findOne(id: string) {
    return `This action returns a #${id} smsSetting`;
  }

  remove(id: string) {
    return `This action removes a #${id} smsSetting`;
  }
}
