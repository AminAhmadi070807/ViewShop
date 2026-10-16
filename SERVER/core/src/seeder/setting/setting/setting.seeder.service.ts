import { Injectable } from '@nestjs/common';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../common/message/message.status';
import data from './object.data';
import { SettingsService } from '../../../modules/settings/settings.service';

@Injectable()
export class SettingSeeder {
  constructor(private readonly settingService: SettingsService) {}

  async seeder() {
    try {
      await this.settingService.setting(data);

      return { status: 200, message: statusMessages.fa['200'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
