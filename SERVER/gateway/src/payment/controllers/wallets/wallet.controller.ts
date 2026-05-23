import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { PaymentService } from '../../payment.service';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import { WalletDto } from './wallet.dto';
import { ValidateUUID } from '../../../common/validation/uuid.dto';

@Controller('payment/wallet')
export class WalletController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  charge(@Body() data: WalletDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.paymentService.send('WALLET:CHARGE', {
      userId: user.userId,
      ...data,
    });
  }

  @Get()
  findAll() {
    return this.paymentService.send('WALLET:FIND');
  }

  @Get('/:id')
  findOne(@Param() data: ValidateUUID) {
    return this.paymentService.send('WALLET:ONE', data);
  }

  @Delete()
  remove(@Param() data: ValidateUUID) {
    return this.paymentService.send('WALLET:DELETE', data);
  }
}
