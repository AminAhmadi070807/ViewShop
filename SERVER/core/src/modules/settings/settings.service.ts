import { Injectable } from '@nestjs/common';
import { SettingDto } from './dto/setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  setting(data: SettingDto) {}

  async find() {
    try {
      const result = await this.settingRepository.find();

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: result[0],
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
