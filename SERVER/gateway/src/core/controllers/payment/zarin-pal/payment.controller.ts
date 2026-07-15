import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  PaymentDto,
  PaymentVerifyStatusEnum,
  VerifyPaymentDto,
} from './payment.dto';
import express from 'express';
import { CoreService } from '../../../core.service';
import { JwtPayload } from '../../../../common/validation/jwt.dto';
import { statusMessages } from '../../../../common/messages/status.message';

@Controller('core/payment/zarin-pal')
export class ZarinPalController {
  constructor(private readonly coreService: CoreService) {}

  @Post('pay')
  payment(@Body() data: PaymentDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('PAYMENT:ZARIN_PAL', {
      user: user.userId,
      ...data,
    });
  }

  @Get('verify')
  verify(@Query() data: VerifyPaymentDto, @Req() req: express.Request) {
    if (data.Status !== PaymentVerifyStatusEnum.OK) {
      return new HttpException(statusMessages.fa['402'], 402);
    }

    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('PAYMENT:ZARIN_PAL:VERIFY', {
      user: user.userId,
      ...data,
    });
  }
}
