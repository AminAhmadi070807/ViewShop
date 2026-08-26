import { Injectable } from '@nestjs/common';
import { ZarinPalService } from './services/zarin_pal/zarin_pal.service';
import { PaymentDto } from './dto/payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentSetting } from './entities/payment.setting.entity';
import { Repository } from 'typeorm';

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
}
