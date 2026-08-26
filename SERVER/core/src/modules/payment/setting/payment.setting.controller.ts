import { Controller } from '@nestjs/common';
import { PaymentSettingService } from './payment.setting.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentSettingDto } from '../dto/payment.setting.dto';

@Controller()
export class PaymentSettingsController {
  constructor(private readonly paymentSettingService: PaymentSettingService) {}

  @MessagePattern('PAYMENT:SETTING:CREATE')
  create(@Payload() data: PaymentSettingDto) {
    return this.paymentSettingService.create(data);
  }
}
