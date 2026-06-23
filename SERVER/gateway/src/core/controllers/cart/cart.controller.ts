import { Body, Controller, Post, Req } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { CartDto } from './cart.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';

@Controller('core/cart')
export class CartController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: CartDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('CART:CREATE', {
      ...data,
      id: user.userId,
    });
  }
}
