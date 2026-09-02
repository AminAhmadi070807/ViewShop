import { Injectable } from '@nestjs/common';
import { SmsSettingDto } from './dto/sms-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SmsSetting } from './entities/sms-setting.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SmsSettingService {
  constructor(
    @InjectRepository(SmsSetting)
    private smsSettingRepository: Repository<SmsSetting>,
  ) {}

  create(data: SmsSettingDto) {}

  findAll() {}

  findOne(id: string) {}

  remove(id: string) {}
}
