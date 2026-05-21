import { Controller } from '@nestjs/common';
import { VerifiesService } from './verifies.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ZarinPalVerifyDto } from './dto/verify.dto';

@Controller()
export class VerifiesController {
  constructor(private readonly verifiesService: VerifiesService) {}

  @MessagePattern('PAYMENT:VERIFY:ZARIN_PAL')
  verify(@Payload() data: ZarinPalVerifyDto) {
    return this.verifiesService.zarinPal(data);
  }
}
