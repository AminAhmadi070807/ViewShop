import { Injectable } from '@nestjs/common';
import { SmDto } from './dto/sm.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sms } from './entities/sm.entity';
import { Repository } from 'typeorm';
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

  sms(data: SmDto) {
    try {
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
