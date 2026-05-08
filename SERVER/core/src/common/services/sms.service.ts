import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SmsDto } from '../validations/sms.dto';

@Injectable()
export class SmsService {
  constructor(private readonly config: ConfigService) {}

  Mediana(data: SmsDto) {}

  FarazSms(data: SmsDto) {}

  SmsIr(data: SmsDto) {}
}
