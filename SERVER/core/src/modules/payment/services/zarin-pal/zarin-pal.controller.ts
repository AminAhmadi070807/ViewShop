import { Controller } from '@nestjs/common';
import { ZarinPalService } from './zarin-pal.service';

@Controller()
export class ZarinPalController {
  constructor(private readonly zarinPalService: ZarinPalService) {}
}
