import { Injectable } from '@nestjs/common';
import { ZarinPalDto } from './zarin-pal.dto';

@Injectable()
export class ZarinPalService {
  verify(data: ZarinPalDto) {}

  payment(data: ZarinPalDto) {}
}
