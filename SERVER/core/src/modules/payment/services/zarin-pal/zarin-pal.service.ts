import { Injectable } from '@nestjs/common';
import { ZarinPalDto, ZarinPalVerifyDto } from './zarin-pal.dto';

@Injectable()
export class ZarinPalService {
  verify(data: ZarinPalVerifyDto) {}

  payment(data: ZarinPalDto) {}
}
