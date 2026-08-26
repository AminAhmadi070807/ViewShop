import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentSetting } from '../entities/payment.setting.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentSettingService {
  constructor(
    @InjectRepository(PaymentSetting)
    private readonly paymentSettingRepository: Repository<PaymentSetting>,
  ) {}
}
