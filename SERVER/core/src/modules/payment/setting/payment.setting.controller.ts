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

  @MessagePattern('SETTING:PAYMENT:CREATE')
  create(@Payload() data: PaymentSettingDto) {
    return this.paymentSettingService.create(data);
  }

  @MessagePattern('SETTING:PAYMENT:FIND')
  findAll() {
    return this.paymentSettingService.findAll();
  }

  @MessagePattern('SETTING:PAYMENT:ONE')
  findOne(@Payload() data: Validate) {
    return this.paymentSettingService.findOne(data.id);
  }

  @MessagePattern('SETTING:PAYMENT:UPDATE')
  update(@Payload() data: UpdatePaymentSettingDto) {
    return this.paymentSettingService.update(data);
  }

  @MessagePattern('SETTING:PAYMENT:UPDATE:STATUS')
  updateStatus(@Payload() data: Validate) {
    return this.paymentSettingService.updateStatus(data.id);
  }

  @MessagePattern('SETTING:PAYMENT:DELETE')
  remove(@Payload() data: Validate) {
    return this.paymentSettingService.remove(data.id);
  }
}
