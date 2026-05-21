import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentService } from './payment.service';
import { ZarinPalDto } from './dto/payment.dto';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern('PAYMENT:ZARIN_PAL')
  zarinPal(@Payload() data: ZarinPalDto) {
    return this.paymentService.zarinPal(data);
  }

  @MessagePattern('PAYMENT:ZIBAL')
  zibal(@Payload() data: ZarinPalDto) {
    return this.paymentService.zibal(data);
  }
}
