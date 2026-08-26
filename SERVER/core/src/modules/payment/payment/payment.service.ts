import { Injectable } from '@nestjs/common';
import { ZarinPalService } from './services/zarin_pal/zarin_pal.service';
import { PaymentDto } from '../dto/payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentSetting } from '../entities/payment.setting.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../common/message/message.status';

@Injectable()
export class PaymentService {
  constructor(
    private readonly zarinPalService: ZarinPalService,
    @InjectRepository(PaymentSetting)
    private readonly paymentSettingRepository: Repository<PaymentSetting>,
  ) {}

  async zarinPal(data: PaymentDto) {
    return await this.zarinPalService.payment(data);
  }

  async findSetting() {
    try {
      const result = await this.paymentSettingRepository.find();

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: result,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
