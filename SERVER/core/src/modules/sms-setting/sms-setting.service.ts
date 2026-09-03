import { Injectable } from '@nestjs/common';
import { SmsSettingDto, UpdateSmsSettingDto } from './dto/sms-setting.dto';
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
        active: true,
        service: data.service,
      });

      if (existing) {
        return new CustomException(statusMessages.fa['409'], 409);
      }

      const result = this.smsSettingRepository.create({
        section: data.section,
        service: data.service,
        details: data.details.map((item) => {
          return {
            id: crypto.randomUUID(),
            title: item.title,
            value: item.value,
          };
        }),
        active: data.active,
      });

      await this.smsSettingRepository.save(result);

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

  async findOne(id: string) {
    try {
      const result = await this.smsSettingRepository.findOneBy({ id });

      if (!result) return new CustomException(statusMessages.fa['404'], 404);

      return { status: 200, message: statusMessages.fa['200'], body: result };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async update(data: UpdateSmsSettingDto) {
    try {
      const result = await this.findOne(data.id);

      if (result instanceof CustomException) return result;

      result.body.active = data.active;
      result.body.service = data.service;
      result.body.section = data.section;
      result.body.details = data.details.map((item) => {
        return {
          id: crypto.randomUUID(),
          title: item.title,
          value: item.value,
        };
      });

      await this.smsSettingRepository.save(data);

      return { status: 204, message: statusMessages.fa['204'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.smsSettingRepository.delete(id);

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return { status: 200, message: statusMessages.fa['200'], body: result };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
