import { Controller } from '@nestjs/common';
import { ZarinPalService } from './zarin-pal.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ZarinPalVerifyDto } from './zarin-pal.dto';

@Controller()
export class ZarinPalController {
  constructor(private readonly zarinPalService: ZarinPalService) {}

  @MessagePattern('PAYMENT:VERIFY:ZARIN_PAL')
  verify(@Payload() data: ZarinPalVerifyDto) {
    return this.zarinPalService.verify(data);
  }
}
