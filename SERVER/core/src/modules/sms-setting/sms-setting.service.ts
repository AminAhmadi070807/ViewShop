import { Injectable } from '@nestjs/common';
import { CreateSmsSettingDto } from './dto/create-sms-setting.dto';
import { UpdateSmsSettingDto } from './dto/update-sms-setting.dto';

@Injectable()
export class SmsSettingService {
  create(createSmsSettingDto: CreateSmsSettingDto) {
    return 'This action adds a new smsSetting';
  }

  findAll() {
    return `This action returns all smsSetting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} smsSetting`;
  }

  update(id: number, updateSmsSettingDto: UpdateSmsSettingDto) {
    return `This action updates a #${id} smsSetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} smsSetting`;
  }
}
