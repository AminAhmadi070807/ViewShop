import { Injectable } from '@nestjs/common';
import { SmDto } from './dto/sm.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sms } from './entities/sm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SmsService {
  constructor(
    @InjectRepository(Sms)
    private readonly smsRepository: Repository<Sms>,
  ) {}

  sms(data: SmDto) {}

  findAll() {}

  findOne(id: string) {}
}
