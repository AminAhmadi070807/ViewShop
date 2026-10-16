import { Injectable } from '@nestjs/common';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../common/message/message.status';
import { InjectRepository } from '@nestjs/typeorm';
import { SmsSetting } from '../../../modules/sms-setting/entities/sms-setting.entity';
import { Repository } from 'typeorm';
import data from './object.data';

@Injectable()
export class SmsSettingSeeder {
  constructor(
    @InjectRepository(SmsSetting)
    private readonly repository: Repository<SmsSetting>,
  ) {}

  async seeder() {
    try {
      const result = await this.repository.find({});

      if (result.length) return;

      for (const detail of data) {
        const result = this.repository.create({
          id: detail.id,
          active: detail.active,
          section: detail.section,
          service: detail.service,
          details: detail.details,
        });

        await this.repository.save(result);
      }

      return { status: 200, message: statusMessages.fa['200'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
