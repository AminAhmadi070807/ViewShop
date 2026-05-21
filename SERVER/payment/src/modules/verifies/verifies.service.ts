import { Injectable } from '@nestjs/common';
import { ZarinPalVerifyDto } from './dto/verify.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../payment/entities/payment.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';
import { ZarinPalVerifyEnum } from '../../common/enums/verifye/status.enum';
import { PaymentStatusEnum } from '../../common/enums/payment/status.enum';
import { PaymentVerifyInterface } from '../../common/interfaces/verifye.interface';

@Injectable()
export class VerifiesService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async verify(data: PaymentVerifyInterface) {
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

      console.log(req);
    } catch {
      return {
        status: 402,
        message: statusMessages.fa['402'],
        body: null,
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
  }
}
