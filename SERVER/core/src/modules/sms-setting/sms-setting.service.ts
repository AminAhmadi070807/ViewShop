import { Injectable } from '@nestjs/common';
import { SmsSettingDto } from './dto/sms-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SmsSetting } from './entities/sms-setting.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class SmsSettingService {
  constructor(
    @InjectRepository(SmsSetting)
    private smsSettingRepository: Repository<SmsSetting>,
  ) {}

  async create(data: SmsSettingDto) {
    try {
      const existing = await this.smsSettingRepository.findOneBy({
        section: data.section,
      });

      if (!existing) {
        const result = this.smsSettingRepository.create(data);

        await this.smsSettingRepository.save(result);
      } else {
        await this.smsSettingRepository.update({ section: data.section }, data);
      }

      return { status: 200, message: statusMessages.fa['200'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const result = await this.smsSettingRepository.find({
        order: { createdAt: 'DESC' },
      });

      return { status: 200, message: statusMessages.fa['200'], body: result };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  findOne(id: string) {}

  remove(id: string) {}
}
