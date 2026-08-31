import { Injectable, OnModuleInit } from '@nestjs/common';
import { ZarinPalDto, ZarinPalVerifyDto } from './dto/zarin-pal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../../entities/payment.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../../common/message/message.status';
import { PaymentSettingService } from '../../setting/payment.setting.service';

@Injectable()
export class ZarinPalService implements OnModuleInit {
  data: Map<string, any> = new Map();

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly paymentSettingService: PaymentSettingService,
  ) {}

  async database(data: ZarinPalDto) {
    try {
      const existing = await this.paymentRepository.findOneBy({
        service: { id: data.payment },
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
        service: { id: data.payment },
        user: { id: data.user },
        amount: data.amount,
        key: data.key,
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
      const database = await this.database(data);
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
        this.data.set(item.pattern, item.value);
      }
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
