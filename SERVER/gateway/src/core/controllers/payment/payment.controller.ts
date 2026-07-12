import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { PaymentDto } from './payment.dto';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import express from 'express';
import { CoreService } from '../../core.service';

@Controller('core/payment/zarin-pal')
export class PaymentController {
  constructor(private readonly coreService: CoreService) {}

  @Post('pay')
  payment(@Body() data: PaymentDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('PAYMENT:ZARIN_PAL', {
      user: user.userId,
      amount: data.amount,
      description: data.description,
      service: data.service,
      service_id: data.service_id,
    });
  }
}
