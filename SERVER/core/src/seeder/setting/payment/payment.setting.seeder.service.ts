import { Injectable } from '@nestjs/common';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../common/message/message.status';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentSetting } from '../../../modules/payment/entities/payment.setting.entity';

@Injectable()
export class PaymentSettingSeeder {
  constructor(
    @InjectRepository(PaymentSetting)
    private readonly repository: Repository<PaymentSetting>,
  ) {}

  async seeder() {
    try {
      return { status: 200, message: statusMessages.fa['200'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
