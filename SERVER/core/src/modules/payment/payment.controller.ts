import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ZarinPalDto } from './dto/payment.dto';
import { ZarinPalService } from './services/zarin_pal/zarin_pal.service';

@Controller()
export class PaymentController {
  constructor(private readonly zarinPayService: ZarinPalService) {}

  @MessagePattern('PAYMENT:ZARIN_PAL')
  zarinPal(@Payload() data: ZarinPalDto) {
    return this.zarinPayService.payment(data);
  }
}
