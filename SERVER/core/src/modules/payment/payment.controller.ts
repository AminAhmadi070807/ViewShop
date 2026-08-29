import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentService } from './payment.service';
import { PaymentDto, VerifyPaymentDto } from './dto/payment.dto';
import { ZarinPalService } from './services/zarin_pal/zarin_pal.service';

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

  @MessagePattern('PAYMENT:VERIFY')
  verify(@Payload() data: VerifyPaymentDto) {
    return this.zarinPalService.verify(data);
  }
}
