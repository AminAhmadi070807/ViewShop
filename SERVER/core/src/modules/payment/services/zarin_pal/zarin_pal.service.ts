import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../../entities/payment.entity';
import { Repository } from 'typeorm';
import { PaymentDto, VerifyPaymentDto } from '../../dto/payment.dto';
import { CustomException } from '../../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../../common/message/message.status';
import { PaymentModelEnum } from '../../../../common/enums/payment/ipg.enum';
import { PaymentStatusEnum } from '../../../../common/enums/payment/status.enum';
import { ZarinPalInterface } from '../../../../common/interfaces/payment.interface';

@Injectable()
export class ZarinPalService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async request(data: PaymentDto) {
    try {
      const result = await fetch(process.env.ZARIN_PAL_API + 'request.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          merchant_id: process.env.ZARIN_PAL_MERCHANT,
          amount: data.amount,
          description: data.description,
          callback_url: process.env.ZARIN_PAL_CALLBACK,
          currency: 'IRT',
        }),
      });

      if (result.status !== 200) {
        return new CustomException(result.statusText, result.status);
      }

      const json = (await result.json()) as ZarinPalInterface;

      const payment = this.paymentRepository.create({
        service: data.service,
        amount: data.amount,
        service_id: data.service_id,
        status: PaymentStatusEnum.WAITING,
        code: json.data.authority,
        IPG: PaymentModelEnum.ZARIN_PAL,
        user: {
          id: data.user,
        },
      });

      await this.paymentRepository.save(payment);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: {
          url: process.env.ZARIN_PAL_URL + json.data.authority,
        },
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async ferify(data: VerifyPaymentDto) {
    try {
      const result = await this.paymentRepository.findOneBy({
        code: data.authority,
        user: { id: data.user },
      });

      if (!result) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const request = await fetch(process.env.ZARIN_PAL_API + 'verify.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          merchant_id: process.env.ZARIN_PAL_MERCHANT,
          authority: data.authority,
          amount: result.amount,
        }),
      });

      console.log(request);
      return true;
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async payment(data: PaymentDto) {
    try {
      const existing = await this.paymentRepository.findOneBy({
        IPG: PaymentModelEnum.ZARIN_PAL,
        service_id: data.service_id,
        user: {
          id: data.user,
        },
        amount: data.amount,
        service: data.service,
        status: PaymentStatusEnum.WAITING,
      });

      if (existing) {
        return {
          status: 200,
          message: statusMessages.fa['200'],
          body: {
            url: (process.env.ZARIN_PAL_URL as string) + existing.code,
          },
        };
      }

      return await this.request(data);
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
