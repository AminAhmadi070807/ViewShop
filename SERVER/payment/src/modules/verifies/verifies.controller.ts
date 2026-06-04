import { Controller } from '@nestjs/common';
import { VerifiesService } from './verifies.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ZarinPalVerifyDto, ZibalVerifyDto } from './dto/verify.dto';

@Controller()
export class VerifiesController {
  constructor(private readonly verifiesService: VerifiesService) {}

  @MessagePattern('PAYMENT:VERIFY:ZARIN_PAL')
  zarinPal(@Payload() data: ZarinPalVerifyDto) {
    return this.verifiesService.zarinPal(data);
  }

  @MessagePattern('PAYMENT:VERIFY:ZIBAL')
  zibal(@Payload() data: ZibalVerifyDto) {
    return this.verifiesService.zibal(data);
  }
}
