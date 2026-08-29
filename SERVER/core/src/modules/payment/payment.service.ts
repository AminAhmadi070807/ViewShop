import { Injectable } from '@nestjs/common';
import { ZarinPalService } from './services/zarin_pal/payment.zarin_pal.service';
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

  async separator(payment: PaymentSetting, user: string, amount: number) {
    const alias = payment.alias.toUpperCase();

    const data = new Map<string, string>();

    for (const item of payment.details) data.set(item.pattern, item.value);

    switch (alias) {
      case 'ZARIN_PAL': {
        return await this.zarinPalService.payment({
          amount,
          user,
          api: data.get('api') as string,
          key: data.get('key') as string,
          url: data.get('url') as string,
          call_back: data.get('call_back') as string,
          payment: payment.id,
        });
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

      return this.separator(payment.body, data.user, data.amount);
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
