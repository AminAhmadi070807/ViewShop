import { Injectable } from '@nestjs/common';
import { PaymentDto } from './dto/payment.dto';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { PaymentSettingService } from './setting/payment.setting.service';
import { ZarinPalService } from './services/zarin-pal/zarin-pal.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentSettingService: PaymentSettingService,
    private readonly zarin_palService: ZarinPalService,
  ) {}

  separator(alias: string, user: string, amount: number) {
    switch (alias.toUpperCase()) {
      case 'ZARIN_PAL': {
        return this.zarin_palService.payment({ amount, user });
      }
      default: {
        return new CustomException(statusMessages.fa['404'], 404);
      }
    }
  }

  async payment(data: PaymentDto) {
    try {
      const payment = await this.paymentSettingService.findOne(data.payment);

      if (payment instanceof CustomException) return payment;
      else if (!payment.body.status) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return this.separator(payment.body.alias, data.user, data.amount);
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
