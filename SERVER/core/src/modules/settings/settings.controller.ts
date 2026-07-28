import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SettingsService } from './settings.service';
import { SettingDto } from './dto/setting.dto';

@Controller()
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @MessagePattern('SETTING')
  setting(@Payload() createSettingDto: SettingDto) {
    return this.settingsService.setting(createSettingDto);
  }

  @MessagePattern('findOneSetting')
  find() {
    return this.settingsService.find();
  }
}
