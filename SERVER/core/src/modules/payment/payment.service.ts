import { Injectable } from '@nestjs/common';
import { ZarinPalService } from './services/zarin_pal/zarin_pal.service';
import { PaymentDto } from './dto/payment.dto';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { PaymentSettingService } from './setting/payment.setting.service';
import { PaymentSetting } from './entities/payment.setting.entity';

@Injectable()
export class PaymentService {
  constructor(
    private readonly zarinPalService: ZarinPalService,
    private readonly paymentSettingService: PaymentSettingService,
  ) {}

  async zarinPal(data: PaymentDto) {
    return await this.zarinPalService.payment(data);
  }

  separator(payment: PaymentSetting) {}

  async payment(data: PaymentDto) {
    try {
      const payment = await this.paymentSettingService.findOne(data.payment);

      if (payment instanceof CustomException) return payment;
      else if (!payment.body.status) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return this.separator(payment.body);
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
