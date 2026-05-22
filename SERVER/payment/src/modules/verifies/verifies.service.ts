import { Injectable } from '@nestjs/common';
import { ZarinPalVerifyDto } from './dto/verify.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../payment/entities/payment.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';
import { ZarinPalVerifyEnum } from '../../common/enums/verifye/status.enum';
import { PaymentStatusEnum } from '../../common/enums/payment/status.enum';
import {
  PaymentVerifyInterface,
  VerifyInterface,
} from '../../common/interfaces/verifye.interface';

@Injectable()
export class VerifiesService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async verify(
    data: PaymentVerifyInterface,
  ): Promise<{ status: number; body: object; message: string }> {
    try {
      const req: Response = await fetch(data.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          merchant_id: data.merchant,
          amount: data.amount,
          authority: data.authority,
        }),
      });

      if (req.status !== 200) {
        return {
          status: req.status,
          message: statusMessages.fa['402'],
          body: {},
        };
      }

      const body: VerifyInterface = (await req.json()) as VerifyInterface;

      return {
        status: body.data.code,
        body,
        message: statusMessages.fa['200'],
      };
    } catch {
      return {
        status: 402,
        message: statusMessages.fa['402'] + 'aaaa',
        body: {},
      };
    }
  }

  async zarinPal(data: ZarinPalVerifyDto) {
    const payment: Payment | null = await this.paymentRepository.findOne({
      where: {
        authority: data.authority,
        user: data.userId,
      },
    });

    if (!payment) throw new CustomException(statusMessages.fa['402'], 402);
    else if (data.status === ZarinPalVerifyEnum.NOK) {
      payment.status = PaymentStatusEnum.FAILED;
      await this.paymentRepository.save(payment);

      throw new CustomException(statusMessages.fa['402'], 402);
    }

    const merchant = process.env.ZARIN_PAL_MERCHANT as string;
    const verifyUrl = process.env.ZARIN_PAL_VALIDATE as string;

    const verify = await this.verify({
      merchant,
      amount: payment.amount,
      authority: payment.authority,
      url: verifyUrl,
    });

    if (verify.status === 101 || verify.status === 100) {
      payment.status = PaymentStatusEnum.SUCCESS;
      await this.paymentRepository.save(payment);

      return {
        status: 204,
        message: statusMessages.fa['200'],
        body: null,
      };
    }

    return {
      status: verify.status,
      message: verify.message,
      body: verify.body,
    };
  }
}
