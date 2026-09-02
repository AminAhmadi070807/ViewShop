import { Injectable } from '@nestjs/common';
import { SmDto, SmSettingDto } from './dto/sm.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sms } from './entities/sm.entity';
import { Repository } from 'typeorm';
import { FarazSmsService } from './services/faraz-sms.service';
import { MedianaService } from './services/mediana.service';
import { SmsIrService } from './services/sms-ir.service';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { SmsServiceEnum } from '../../common/enums/sms/sms.enum';
import { Sms_Setting } from './entities/sms.setting.entity';

@Injectable()
export class SmsService {
  constructor(
    @InjectRepository(Sms)
    private readonly smsRepository: Repository<Sms>,
    @InjectRepository(Sms_Setting)
    private readonly smsSettingRepository: Repository<Sms_Setting>,
    private readonly farazSmsService: FarazSmsService,
    private readonly medianaService: MedianaService,
    private readonly smsIrService: SmsIrService,
  ) {}

  private async setData(data: SmDto) {
    try {
      const result = this.smsRepository.create(data);

      await this.smsRepository.save(result);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: { id: result.id },
      };
    } catch {
      return new CustomException(statusMessages.fa['500'], 500);
    }
  }

  farazSms(data: SmDto) {
    return {
      status: 404,
      message: statusMessages.fa['404'],
      body: null,
    };
  }

  async mediana(data: SmDto) {
    try {
      const smsResult = await this.medianaService.sms(
        data.cell_phone,
        data.message,
      );

      if (smsResult instanceof CustomException) return smsResult;

      return await this.setData(data);
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async smsIr(data: SmDto) {
    try {
      const smsResult = await this.smsIrService.sms(
        data.cell_phone,
        data.message,
      );

      if (smsResult instanceof CustomException) return smsResult;

      return await this.setData(data);
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async sms(data: SmDto) {
    try {
      let service = data.service;

      if (!service) {
        const setting = await this.smsSettingRepository.findOneBy({
          section: data.section,
        });

        if (!setting) return new CustomException(statusMessages.fa['500'], 500);

        service = setting.service;
      }

      const main_data = { ...data, service };

      switch (service) {
        case SmsServiceEnum.FARAZ_SMS:
          return this.farazSms(main_data);
        case SmsServiceEnum.SMS_IR:
          return this.smsIr(main_data);
        case SmsServiceEnum.MEDIA_NA:
          return this.mediana(main_data);
        default:
          return new CustomException(statusMessages.fa['404'], 404);
      }
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const result = await this.smsRepository.find({
        order: { createdAt: 'DESC' },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: result,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async setting(data: SmSettingDto) {
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

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findSetting() {
    try {
      const result = await this.smsSettingRepository.find({
        order: { createdAt: 'DESC' },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: result,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
