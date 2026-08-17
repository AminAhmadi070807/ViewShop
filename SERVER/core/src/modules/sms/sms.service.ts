import { Injectable } from '@nestjs/common';
import { SmDto } from './dto/sm.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sms } from './entities/sm.entity';
import { Repository } from 'typeorm';
import { FarazSmsService } from './services/faraz-sms.service';
import { MedianaService } from './services/mediana.service';
import { SmsIrService } from './services/sms-ir.service';

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

  findAll() {}

  findOne(id: string) {}
}
