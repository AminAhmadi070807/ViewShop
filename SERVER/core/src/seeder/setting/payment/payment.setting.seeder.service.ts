import { Injectable } from '@nestjs/common';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../common/message/message.status';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentSetting } from '../../../modules/payment/entities/payment.setting.entity';
import data from './object.data';

@Injectable()
export class PaymentSettingSeeder {
  constructor(
    @InjectRepository(PaymentSetting)
    private readonly repository: Repository<PaymentSetting>,
  ) {}

  async seeder() {
    try {
      for (const detail of data) {
        const exist = await this.repository.findOneBy({ id: detail.id });

        if (exist) continue;

        const result = this.repository.create({
          id: detail.id,
          call_back: detail.call_back,
          api: detail.api,
          status: detail.status,
          alias: detail.alias,
          details: detail.details,
          payment_key: detail.payment_key,
          media: { id: detail.media },
          title: detail.title,
        });

        await this.repository.save(result);
      }

      return { status: 200, message: statusMessages.fa['200'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
