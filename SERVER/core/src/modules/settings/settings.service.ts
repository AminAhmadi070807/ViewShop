import { Injectable } from '@nestjs/common';
import { SettingDto } from './dto/setting.dto';
import { UpdateSettingDto } from '../dto/update-setting.dto';

@Injectable()
export class SettingsService {
  create(createSettingDto: SettingDto) {
    return 'This action adds a new setting';
  }

  findAll() {
    return `This action returns all settings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} setting`;
  }

  update(id: number, updateSettingDto: UpdateSettingDto) {
    return `This action updates a #${id} setting`;
  }

  remove(id: number) {
    return `This action removes a #${id} setting`;
  }
}
