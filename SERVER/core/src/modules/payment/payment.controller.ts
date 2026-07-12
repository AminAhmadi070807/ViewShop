import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern('PAYMENT:ZARIN_PAL')
  zarinPal(@Payload() data: PaymentDto) {
    return this.paymentService.zarinPal(data);
  }
}
