import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { CartDto } from './cart.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('core/cart')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class CartController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  create(@Body() data: CartDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('CART:CREATE', {
      ...data,
      id: user.userId,
    });
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findAll() {
    return this.coreService.send('CART:FIND');
  }

  @Get()
  findOne() {
    return this.coreService.send('CART:ONE');
  }
}
