import { Body, Controller, Post, Req } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { OrderDto } from './order.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';

@Controller('core/order')
export class OrderController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: OrderDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('ORDER:CREATE', {
      user: user.userId,
      address: data.address,
    });
  }
}
