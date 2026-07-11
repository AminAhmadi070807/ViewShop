import { Injectable } from '@nestjs/common';
import { ZarinPalService } from './zarin_pal/zarin_pal.service';
import { ZarinPalDto } from './dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly zarinPalService: ZarinPalService) {}

  zarinPal(data: ZarinPalDto) {
    return this.zarinPalService.payment(data);
  }
}
