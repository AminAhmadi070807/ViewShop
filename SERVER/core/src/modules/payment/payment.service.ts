import { Injectable } from '@nestjs/common';
import { ZarinPalService } from './services/zarin_pal/zarin_pal.service';
import { PaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly zarinPalService: ZarinPalService) {}

  async zarinPal(data: PaymentDto) {
    return await this.zarinPalService.payment(data);
  }
}
