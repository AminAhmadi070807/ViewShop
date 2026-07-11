import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../../entities/payment.entity';
import { Repository } from 'typeorm';
import { ZarinPalDto } from '../../dto/payment.dto';
import { CustomException } from '../../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../../common/message/message.status';
import { PaymentModelEnum } from '../../../../common/enums/payment/ipg.enum';
import { PaymentStatusEnum } from '../../../../common/enums/payment/status.enum';

@Injectable()
export class ZarinPalService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async request(data: ZarinPalDto) {
    try {
      const result = await fetch(process.env.ZARIN_PAL_API as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          merchant_id: process.env.ZARIN_PAL_CALLBACK,
          amount: data.amount,
          description: data.description,
          callback_url: process.env.ZARIN_PAL_CALLBACK as string,
        }),
      });

      return result;
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async payment(data: ZarinPalDto) {
    try {
      const existing = await this.paymentRepository.findOneBy({
        IPG: PaymentModelEnum.ZARIN_PAL,
        service_id: data.service_id,
        user: data.user,
        amount: data.amount,
        service: data.service,
        status: PaymentStatusEnum.WAITING,
      });

      if (existing) {
        return {
          status: 200,
          message: statusMessages.fa['200'],
          body: {
            code: existing.code,
          },
        };
      }
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
