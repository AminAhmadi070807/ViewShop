import { Injectable } from '@nestjs/common';
import { SmsSettingDto } from './dto/sms-setting.dto';

@Injectable()
export class SmsSettingService {
  create(data: SmsSettingDto) {}

  findAll() {}

  findOne(id: string) {}

  remove(id: string) {}
}
