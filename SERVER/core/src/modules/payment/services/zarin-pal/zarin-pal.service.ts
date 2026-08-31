import { Injectable, OnModuleInit } from '@nestjs/common';
import { ZarinPalDto, ZarinPalVerifyDto } from './zarin-pal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../../entities/payment.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../../common/message/message.status';
import { PaymentSettingService } from '../../setting/payment.setting.service';

@Injectable()
export class ZarinPalService implements OnModuleInit {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly paymentSettingService: PaymentSettingService,
  ) {}

  verify(data: ZarinPalVerifyDto) {}

  payment(data: ZarinPalDto) {}

  onModuleInit() {
    try {
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
