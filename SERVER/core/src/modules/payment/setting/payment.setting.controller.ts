import { Controller } from '@nestjs/common';
import { PaymentSettingService } from './payment.setting.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  PaymentSettingDto,
  UpdatePaymentSettingDto,
} from '../dto/payment.setting.dto';
import { Validate } from '../../../common/validations/validate.dto';

@Controller()
export class PaymentSettingsController {
  constructor(private readonly paymentSettingService: PaymentSettingService) {}

  @MessagePattern('PAYMENT:SETTING:CREATE')
  create(@Payload() data: PaymentSettingDto) {
    return this.paymentSettingService.create(data);
  }

  @MessagePattern('PAYMENT:SETTING:FIND')
  findAll() {
    return this.paymentSettingService.findAll();
  }

  @MessagePattern('PAYMENT:SETTING:ONE')
  findOne(@Payload() data: Validate) {
    return this.paymentSettingService.findOne(data.id);
  }

  @MessagePattern('PAYMENT:SETTING:UPDATE')
  update(@Payload() data: UpdatePaymentSettingDto) {
    return this.paymentSettingService.update(data);
  }

  @MessagePattern('PAYMENT:SETTING:DELETE')
  remove(@Payload() data: Validate) {
    return this.paymentSettingService.remove(data.id);
  }
}
