import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../../entities/payment.entity';
import { Repository } from 'typeorm';
import {
  PaymentDto,
  VerifyPaymentDto,
  VerifyStatusEnum,
} from '../../dto/payment.dto';
import { CustomException } from '../../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../../common/message/message.status';
import { PaymentModelEnum } from '../../../../common/enums/payment/ipg.enum';
import { PaymentStatusEnum } from '../../../../common/enums/payment/status.enum';
import {
  VerifyZarinPalInterface,
  ZarinPalInterface,
} from '../../../../common/interfaces/payment.interface';
import { WalletService } from '../../../wallet/wallet.service';

@Injectable()
export class ZarinPalService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly walletService: WalletService,
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
          description: 'شارژ کیف پول کاربر',
          callback_url: process.env.ZARIN_PAL_CALLBACK,
          currency: 'IRT',
        }),
      });

      if (result.status !== 200) {
        return new CustomException(result.statusText, result.status);
      }

      const json = (await result.json()) as ZarinPalInterface;

      const payment = this.paymentRepository.create({
        amount: data.amount,
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

  async verify(data: VerifyPaymentDto) {
    try {
      const result = await this.paymentRepository.findOneBy({
        code: data.Authority,
        user: { id: data.user },
      });

      if (!result) return new CustomException(statusMessages.fa['404'], 404);

      if (data.Status === VerifyStatusEnum.NOK) {
        result.status = PaymentStatusEnum.CANCELED;

        await this.paymentRepository.save(result);

        return { status: 402, message: statusMessages.fa['402'], body: null };
      }

      const request = await fetch(process.env.ZARIN_PAL_API + 'verify.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchant_id: process.env.ZARIN_PAL_MERCHANT,
          authority: data.Authority,
          amount: result.amount,
        }),
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
          { code: data.Authority },
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
          code: data.Authority,
        });

        if (!result) {
          return new CustomException(statusMessages.fa['404'], 404);
        }

        switch (result.status) {
          case PaymentStatusEnum.WAITING: {
            const result = await this.paymentRepository.update(
              { code: data.Authority },
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

        return {
          status: 200,
          message: statusMessages.fa['200'],
          body: null,
        };
      }

      return {
        status: 402,
        message: statusMessages.fa['402'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async payment(data: PaymentDto) {
    try {
      const existing = await this.paymentRepository.findOneBy({
        IPG: PaymentModelEnum.ZARIN_PAL,
        user: { id: data.user },
        amount: data.amount,
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
