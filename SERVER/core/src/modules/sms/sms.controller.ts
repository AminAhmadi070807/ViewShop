import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SmsService } from './sms.service';
import { SmDto } from './dto/sm.dto';

@Controller()
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @MessagePattern('SMS:SEND')
  sms(@Payload() data: SmDto) {
    return this.smsService.sms(data);
  }

  @MessagePattern('SMS:FIND')
  findAll() {
    return this.smsService.findAll();
  }
}
