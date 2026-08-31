import { Controller } from '@nestjs/common';
import { ZarinPalService } from './zarin-pal.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ZarinPalDto } from './zarin-pal.dto';

@Controller()
export class ZarinPalController {
  constructor(private readonly zarinPalService: ZarinPalService) {}

  @MessagePattern('PAYMENT:VERIFY:ZARIN_PAL')
  verify(@Payload() data: ZarinPalDto) {
    return this.zarinPalService.verify(data);
  }
}
