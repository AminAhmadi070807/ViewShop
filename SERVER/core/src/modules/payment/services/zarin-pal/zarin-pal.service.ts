import { Injectable, OnModuleInit } from '@nestjs/common';
import { ZarinPalDto, ZarinPalVerifyDto } from './dto/zarin-pal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../../entities/payment.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../../common/message/message.status';
import { PaymentSettingService } from '../../setting/payment.setting.service';
import { ZarinPalInterface } from '../../../../common/interfaces/payment.interface';

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
  ) {}

  async database(data: ZarinPalDto) {
    try {
      const existing = await this.paymentRepository.findOneBy({
        service: { id: this.payment_id },
        user: { id: data.user },
      });

      if (existing) {
        await this.paymentRepository.update(existing.id, {
          amount: data.amount,
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
        key: this.key,
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

  verify(data: ZarinPalVerifyDto) {}

  async payment(data: ZarinPalDto) {
    try {
      const response = await fetch(this.api + 'request.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: data.amount,
          callback_url: this.callback_url,
          merchant_id: this.key,
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
          case 'api':
            this.api = item.value;
            break;

          case 'key':
            this.key = item.value;
            break;

          case 'url':
            this.url = item.value;
            break;
        }
      }

      this.callback_url = result.body.call_back;
      this.payment_id = result.body.id;

      if (!this.api || !this.key || !this.callback_url) {
        return new CustomException(statusMessages.fa['402'], 402);
      }
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
