import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';
import { ZarinPalService } from './services/zarin_pal/payment.zarin_pal.service';
import { VerifyPaymentDto } from './services/zarin_pal/zarin_pal.dto';

@Controller()
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly zarinPalService: ZarinPalService,
  ) {}

  @MessagePattern('PAYMENT:PAY')
  payment(@Payload() data: PaymentDto) {
    return this.paymentService.payment(data);
  }
}
