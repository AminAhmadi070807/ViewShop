import { Body, Controller, Post, Query, Req } from '@nestjs/common';
import { PaymentService } from '../../payment.service';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import express from 'express';
import { ZarinPalVerifyDto } from './verify.dto';

@Controller('payment/verify')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('zarin_pal')
  ZarinPal(@Req() req: express.Request, @Query() data: ZarinPalVerifyDto) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.paymentService.send('PAYMENT:VERIFY:ZARIN_PAL', {
      user: user.userId,
      authority: data.Authority,
      status: data.Status,
    });
  }
}
