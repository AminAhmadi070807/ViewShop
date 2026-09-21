import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CoreService } from '../../core.service';
import { OrderDto, UpdateOrderDto } from './order.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';
import { ValidateUUID } from '../../../common/validation/uuid.dto';

@Controller('core/order')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class OrderController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'ORDER', enum: ['ORDER'] },
    { name: 'permission', required: true, example: 'CREATE', enum: ['CREATE'] },
  ])
  create(@Body() data: OrderDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('ORDER:CREATE', {
      user: user.userId,
      address: data.address,
    });
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'ORDER', enum: ['ORDER'] },
    { name: 'permission', required: true, example: 'READ', enum: ['READ'] },
  ])
  findAll() {
    return this.coreService.send('ORDER:FIND');
  }

  @Get('/:id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'ORDER', enum: ['ORDER'] },
    {
      name: 'permission',
      required: true,
      example: 'READ:ONE',
      enum: ['READ:ONE'],
    },
  ])
  findOne(@Param() data: ValidateUUID) {
    return this.coreService.send('ORDER:ONE', data);
  }

  @Patch()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'ORDER', enum: ['ORDER'] },
    { name: 'permission', required: true, example: 'UPDATE', enum: ['UPDATE'] },
  ])
  update(@Body() data: UpdateOrderDto) {
    return this.coreService.send('ORDER:UPDATE', data);
  }

  @Post('payment')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'ORDER', enum: ['ORDER'] },
    {
      name: 'permission',
      required: true,
      example: 'PAYMENT',
      enum: ['PAYMENT'],
    },
  ])
  payment(@Body() data: ValidateUUID) {
    return this.coreService.send('ORDER:PAYMENT', data);
  }

  @Delete('payment')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'ORDER', enum: ['ORDER'] },
    { name: 'permission', required: true, example: 'DELETE', enum: ['DELETE'] },
  ])
  remove(@Body() data: ValidateUUID) {
    return this.coreService.send('ORDER:DELETE', data);
  }
}
