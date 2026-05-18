import { Injectable } from '@nestjs/common';
import { ZarinPalDto } from './dto/payment.dto';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentService {
  constructor(private readonly config: ConfigService) {}

  async zarinPal(data: ZarinPalDto) {
    try {
      const url = this.config.get<string>('ZARIN_PAL_REQUEST');
      const merchant = this.config.get<string>('ZARIN_PAL_MERCHANT');
      const callbackUrl: string = this.config.get<string>(
        'PAYMENT_CALLBACK_URL',
        '/api/v1/payment/verify',
      );

      if (!url) return new CustomException(statusMessages.fa['400'], 400);

      const result: Response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          merchant_id: merchant,
          amount: data.amount,
          description: data.description,
          callback_url: callbackUrl,
        }),
      });

      console.log(result);
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
