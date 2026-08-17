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

@Injectable()
export class SmsService {
  constructor(
    @InjectRepository(Sms)
    private readonly smsRepository: Repository<Sms>,
    private readonly farazSmsService: FarazSmsService,
    private readonly medianaService: MedianaService,
    private readonly smsIrService: SmsIrService,
  ) {}

  farazSms() {}

  mediana() {}

  smsIr() {}

  sms(data: SmDto) {}

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
