import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../../entities/payment.entity';
import { Repository } from 'typeorm';
import { PaymentRequestInterface } from '../../dto/payment.dto';
import { CustomException } from '../../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../../common/message/message.status';
import { PaymentStatusEnum } from '../../../../common/enums/payment/status.enum';
import {
  VerifyZarinPalInterface,
  ZarinPalInterface,
} from '../../../../common/interfaces/payment.interface';
import { WalletService } from '../../../wallet/wallet.service';
import { VerifyPaymentDto, VerifyStatusEnum } from './zarin_pal.dto';

@Injectable()
export class ZarinPalService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly walletService: WalletService,
  ) {}

  payment_body(data: PaymentRequestInterface) {
    return {
      merchant_id: data.key,
      amount: data.amount,
      description: 'شارژ کیف پول کاربر',
      callback_url: data.call_back,
      currency: 'IRT',
    };
  }

  payment_verify(key: string, payment_key: string, price: number) {
    return { merchant_id: key, authority: payment_key, amount: price };
  }

  async request(data: PaymentRequestInterface) {
    try {
      const result = await fetch(data.api + 'request.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.payment_body(data)),
      });

      if (result.status !== 200) {
        return new CustomException(result.statusText, result.status);
      }

      const json = (await result.json()) as ZarinPalInterface;

      const payment = this.paymentRepository.create({
        amount: data.amount,
        status: PaymentStatusEnum.WAITING,
        code: json.data.authority,
        service: { id: data.payment },
        user: { id: data.user },
      });

      await this.paymentRepository.save(payment);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: { url: process.env.ZARIN_PAL_URL + json.data.authority },
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async verify(data: VerifyPaymentDto) {
    try {
      const result = await this.paymentRepository.findOneBy({
        code: data.key,
        user: { id: data.user },
      });

      if (!result) return new CustomException(statusMessages.fa['404'], 404);

      if (data.status === VerifyStatusEnum.NOK) {
        result.status = PaymentStatusEnum.CANCELED;

        await this.paymentRepository.save(result);

        return { status: 402, message: statusMessages.fa['402'], body: null };
      }

      const request = await fetch(process.env.ZARIN_PAL_API + 'verify.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          this.payment_verify(result.service.id, data.key, result.amount),
        ),
      });

      if (request.status !== 200) {
        return new CustomException(request.statusText, +result.status);
      }

      const json = (await request.json()) as VerifyZarinPalInterface;

      if (json.errors.length) {
        return new CustomException(statusMessages.fa['402'], 402);
      }

      if (json.data.code === 100) {
        const update = await this.paymentRepository.update(
          { code: data.key },
          { status: PaymentStatusEnum.SUCCESS },
        );

        if (!update.affected) {
          return new CustomException(statusMessages.fa['404'], 404);
        }

        await this.walletService.charge({
          user: data.user,
          amount: result.amount,
        });

        return { status: 200, message: statusMessages.fa['200'], body: null };
      } else if (json.data.code === 101) {
        const result = await this.paymentRepository.findOneBy({
          code: data.key,
        });

        if (!result) {
          return new CustomException(statusMessages.fa['404'], 404);
        }

        switch (result.status) {
          case PaymentStatusEnum.WAITING: {
            const result = await this.paymentRepository.update(
              { code: data.key },
              { status: PaymentStatusEnum.SUCCESS },
            );

            if (!result.affected) {
              return new CustomException(statusMessages.fa['404'], 404);
            }
            break;
          }

          case PaymentStatusEnum.SUCCESS: {
            break;
          }

          case PaymentStatusEnum.FAILED:
          case PaymentStatusEnum.CANCELED:
          default: {
            return {
              status: 402,
              message: statusMessages.fa['402'],
              body: null,
            };
          }
        }

        return { status: 200, message: statusMessages.fa['200'], body: null };
      }

      return { status: 402, message: statusMessages.fa['402'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async payment(data: PaymentRequestInterface) {
    try {
      const existing = await this.paymentRepository.findOneBy({
        service: { id: data.payment },
        user: { id: data.user },
        amount: data.amount,
        status: PaymentStatusEnum.WAITING,
      });

      if (existing) {
        return {
          status: 200,
          message: statusMessages.fa['200'],
          body: { url: (process.env.ZARIN_PAL_URL as string) + existing.code },
        };
      }

      return await this.request(data);
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
