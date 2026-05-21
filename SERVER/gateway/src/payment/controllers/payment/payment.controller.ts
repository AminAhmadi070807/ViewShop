import { Body, Controller, Post, Req } from '@nestjs/common';
import { PaymentService } from '../../payment.service';
import { PaymentDto } from './payment.dto';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import express from 'express';

@Controller('payment/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('zarin_pal')
  ZarinPal(@Body() data: PaymentDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.paymentService.send('PAYMENT:ZARIN_PAL', {
      user: user.userId,
      amount: data.amount,
      description: data.description,
    });
  }

  @Post('zibal')
  Zibal(@Body() data: PaymentDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.paymentService.send('PAYMENT:ZIBAL', {
      user: user.userId,
      amount: data.amount,
      description: data.description,
    });
  }
}
