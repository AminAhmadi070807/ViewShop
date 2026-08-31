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

  verify(data: ZarinPalVerifyDto) {}

  payment(data: ZarinPalDto) {}

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
