import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../../core.service';
import { PaymentSettingDto } from './payment.setting.dto';

@Controller('core/payment/setting')
export class PaymentSettingController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: PaymentSettingDto) {
    return this.coreService.send('PAYMENT:SETTING:CREATE', data);
  }
}
