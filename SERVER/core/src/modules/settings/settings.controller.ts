import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SettingsService } from './settings.service';
import { SettingDto } from './dto/setting.dto';

@Controller()
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @MessagePattern('SETTING:UPDATE')
  setting(@Payload() data: SettingDto) {
    return this.settingsService.setting(data);
  }

  @MessagePattern('SETTING:FIND')
  find() {
    return this.settingsService.find();
  }
}
