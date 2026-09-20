import { Injectable, OnModuleInit } from '@nestjs/common';
import { ZarinPalDto, ZarinPalVerifyDto } from './dto/zarin-pal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../../entities/payment.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../../common/message/message.status';
import { PaymentSettingService } from '../../setting/payment.setting.service';
import {
  VerifyZarinPalInterface,
  ZarinPalInterface,
} from '../../../../common/interfaces/payment.interface';
import { PaymentStatusEnum } from '../../../../common/enums/payment/status.enum';
import { WalletService } from '../../../wallet/wallet.service';

@Injectable()
export class ZarinPalService implements OnModuleInit {
  api: string;
  key: string;
  url: string;
  callback_url: string;
  payment_id: string;

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly paymentSettingService: PaymentSettingService,
    private readonly walletService: WalletService,
  ) {}

  async database(data: ZarinPalDto, authority: string) {
    try {
      const existing = await this.paymentRepository.findOneBy({
        service: { id: this.payment_id },
        user: { id: data.user },
        status: PaymentStatusEnum.WAITING,
      });

      if (existing) {
        await this.paymentRepository.update(existing.id, {
          amount: data.amount,
          key: authority,
        });

        return {
          status: 200,
          message: statusMessages.fa['200'],
          body: { id: existing.id },
        };
      }

      const payment = this.paymentRepository.create({
        service: { id: this.payment_id },
        user: { id: data.user },
        amount: data.amount,
        key: authority,
      });

      await this.paymentRepository.save(payment);

      return {
        status: 200,
        messages: statusMessages.fa['200'],
        body: { id: payment.id },
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async wallet(user: string, amount: number, service: string, key: string) {
    try {
      return await this.walletService.charge({
        service,
        user,
        key,
        amount,
      });
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async verify(data: ZarinPalVerifyDto) {
    try {
      const result_database = await this.paymentRepository.findOne({
        where: {
          user: { id: data.user },
          status: PaymentStatusEnum.WAITING,
          service: { id: this.payment_id },
          key: data.key,
        },
        relations: ['user', 'service'],
      });

      if (!result_database) {
        return new CustomException(statusMessages.fa['402'], 402);
      }

      const response = await fetch(this.api + 'verify.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchant_id: this.key,
          authority: result_database.key,
          amount: result_database.amount,
        }),
      });

      if (response.status !== 200) {
        return new CustomException(response.statusText, 402);
      }

      const result = (await response.json()) as VerifyZarinPalInterface;

      if (result.errors.length) {
        return new CustomException(response.statusText, 402);
      } else if (result.data.code === 100) {
        result_database.status = PaymentStatusEnum.SUCCESS;
        await this.paymentRepository.save(result_database);

        await this.wallet(
          data.user,
          result_database.amount,
          result_database.service.title,
          result_database.key,
        );

        return new CustomException(statusMessages.fa['200'], 200);
      } else if (result.data.code === 101) {
        result_database.status = PaymentStatusEnum.SUCCESS;
        await this.paymentRepository.save(result_database);

        await this.wallet(
          data.user,
          result_database.amount,
          result_database.service.title,
          result_database.key,
        );

        return new CustomException(statusMessages.fa['200'], 200);
      }

      return new CustomException(statusMessages.fa['402'], 402);
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async payment(data: ZarinPalDto) {
    try {
      const response = await fetch(this.api + 'request.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: data.amount,
          callback_url: this.callback_url,
          merchant_id: this.key,
          currency: 'IRT',
          description: 'شارژگردن کیف پول کاربر',
        }),
      });

      if (response.status !== 200) {
        return new CustomException(response.statusText, response.status);
      }

      const result = (await response.json()) as ZarinPalInterface;

      if (result.errors.length) {
        return new CustomException(statusMessages.fa['402'], 402);
      }

      await this.database(data, result.data.authority);

      return {
        status: 200,
        messages: statusMessages.fa['200'],
        body: { url: this.url + result.data.authority },
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async onModuleInit() {
    try {
      const result =
        await this.paymentSettingService.findOneByTitle('ZARIN_PAL');

      if (result instanceof CustomException) return result;

      for (const item of result.body.details) {
        switch (item.pattern) {
          case 'url':
            this.url = item.value;
            break;
        }
      }

      this.callback_url = result.body.call_back;
      this.payment_id = result.body.id;
      this.api = result.body.api;
      this.key = result.body.payment_key;

      if (!this.api || !this.key || !this.callback_url) {
        return new CustomException(statusMessages.fa['402'], 402);
      }
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
