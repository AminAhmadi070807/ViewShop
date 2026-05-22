import { Controller, Get, Query, Req } from '@nestjs/common';
import { PaymentService } from '../../payment.service';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import express from 'express';
import { ZarinPalVerifyDto } from './verify.dto';
import { PublicAccess } from '../../../common/decorators/public.access.decorator';

@Controller('payment/verify')
export class VerifyController {
  constructor(private readonly paymentService: PaymentService) {}

  @PublicAccess()
  @Get('zarin_pal')
  ZarinPal(@Req() req: express.Request, @Query() data: ZarinPalVerifyDto) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.paymentService.send('PAYMENT:VERIFY:ZARIN_PAL', {
      userId: user.userId,
      authority: data.Authority,
      status: data.Status,
    });
  }
}
