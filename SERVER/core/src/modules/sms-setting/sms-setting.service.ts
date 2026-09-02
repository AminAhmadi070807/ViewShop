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

  findOne(id: number) {
    return `This action returns a #${id} smsSetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} smsSetting`;
  }
}
