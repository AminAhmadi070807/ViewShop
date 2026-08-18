import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { SmDto } from './sms.dto';

@Controller()
export class SmsController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  sms(@Body() data: SmDto) {
    return this.coreService.send('SMS:SEND', data);
  }
}
