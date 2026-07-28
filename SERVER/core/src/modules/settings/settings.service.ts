import { Injectable } from '@nestjs/common';
import { SettingDto } from './dto/setting.dto';

@Injectable()
export class SettingsService {
  setting(data: SettingDto) {}

  find() {}
}
