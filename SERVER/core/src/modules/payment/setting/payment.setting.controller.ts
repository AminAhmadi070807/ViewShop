import { Controller } from '@nestjs/common';
import { PaymentSettingService } from './payment.setting.service';

@Controller()
export class PaymentSettingsController {
  constructor(private readonly paymentSettingService: PaymentSettingService) {}
}
