import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SettingsService } from './settings.service';
import { SettingDto } from './dto/setting.dto';
import { UpdateSettingDto } from '../dto/update-setting.dto';

@Controller()
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @MessagePattern('createSetting')
  create(@Payload() createSettingDto: SettingDto) {
    return this.settingsService.create(createSettingDto);
  }

  @MessagePattern('findAllSettings')
  findAll() {
    return this.settingsService.findAll();
  }

  @MessagePattern('findOneSetting')
  findOne(@Payload() id: number) {
    return this.settingsService.findOne(id);
  }

  @MessagePattern('updateSetting')
  update(@Payload() updateSettingDto: UpdateSettingDto) {
    return this.settingsService.update(updateSettingDto.id, updateSettingDto);
  }

  @MessagePattern('removeSetting')
  remove(@Payload() id: number) {
    return this.settingsService.remove(id);
  }
}
