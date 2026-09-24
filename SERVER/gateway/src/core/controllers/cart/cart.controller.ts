import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CoreService } from '../../core.service';
import { CartDto } from './cart.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import {
  ApiConflictResponse,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';
import { ValidateUUID } from '../../../common/validation/uuid.dto';

@Controller('core/cart')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class CartController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'CART', enum: ['CART'] },
    { name: 'permission', required: true, example: 'CREATE', enum: ['CREATE'] },
  ])
  create(@Body() data: CartDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('CART:CREATE', {
      ...data,
      user: user.userId,
    });
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'CART', enum: ['CART'] },
    { name: 'permission', required: true, example: 'READ', enum: ['READ'] },
  ])
  findAll() {
    return this.coreService.send('CART:FIND');
  }

  @Get('my-cart')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'CART', enum: ['CART'] },
    {
      name: 'permission',
      required: true,
      example: 'READ:ONE',
      enum: ['READ:ONE'],
    },
  ])
  findOne(@Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('CART:ONE', { id: user.userId });
  }

  @Patch()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'CART', enum: ['CART'] },
    { name: 'permission', required: true, example: 'EMPTY', enum: ['EMPTY'] },
  ])
  empty(@Body() data: ValidateUUID) {
    return this.coreService.send('CART:EMPTY', data);
  }

  @Delete()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'CART', enum: ['CART'] },
    { name: 'permission', required: true, example: 'EMPTY', enum: ['EMPTY'] },
  ])
  remove(@Body() data: ValidateUUID) {
    return this.coreService.send('CART:DELETE', data);
  }
}
