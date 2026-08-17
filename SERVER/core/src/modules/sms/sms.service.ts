import { Injectable } from '@nestjs/common';
import { SmDto } from './dto/sm.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sms } from './entities/sm.entity';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';
import { FarazSmsService } from './services/faraz-sms.service';
import { MedianaService } from './services/mediana.service';
import { SmsIrService } from './services/sms-ir.service';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { SmsServiceEnum } from '../../common/enums/sms/sms.enum';

@Injectable()
export class SmsService {
  constructor(
    @InjectRepository(Sms)
    private readonly smsRepository: Repository<Sms>,
    private readonly farazSmsService: FarazSmsService,
    private readonly medianaService: MedianaService,
    private readonly smsIrService: SmsIrService,
  ) {}

  farazSms(data: SmDto) {}

  mediana(data: SmDto) {}

  smsIr(data: SmDto) {}

  async sms(data: SmDto) {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const day = await this.smsRepository.find({
        where: {
          cell_phone: data.cell_phone,
          createdAt: Between(startOfDay, endOfDay),
        },
      });

      if (day.length > 5) {
        return new CustomException(statusMessages.fa['403'], 403);
      }

      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      const month = await this.smsRepository.find({
        where: {
          cell_phone: data.cell_phone,
          createdAt: MoreThanOrEqual(oneMonthAgo),
        },
      });

      if (month.length > 20) {
        return new CustomException(statusMessages.fa['403'], 403);
      }

      switch (data.service) {
        case SmsServiceEnum.FARAZ_SMS:
          this.farazSms(data);
          break;
        case SmsServiceEnum.SMS_IR:
          this.smsIr(data);
          break;
        case SmsServiceEnum.MEDIA_NA:
          this.mediana(data);
          break;
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
}
