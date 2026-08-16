import { Injectable } from '@nestjs/common';
import { SmDto } from './dto/sm.dto';

@Injectable()
export class SmsService {
  sms(data: SmDto) {}

  findAll() {}

  findOne(id: number) {}
}
