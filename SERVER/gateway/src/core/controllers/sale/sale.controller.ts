import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { CoreService } from '../../core.service';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiHeaders,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import { SaleDto } from './sale.dto';

@Controller('core/sales')
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiForbiddenResponse({ description: statusMessages.fa['403'] })
@ApiBadRequestResponse({ description: statusMessages.fa['500'] })
export class SaleController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'SALE', enum: ['SALE'] },
    { name: 'permission', required: true, example: 'READ', enum: ['READ'] },
  ])
  sale(@Body() data: SaleDto) {
    return this.coreService.send('SALES:SALE', data);
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'SALE', enum: ['SALE'] },
    { name: 'permission', required: true, example: 'READ', enum: ['READ'] },
  ])
  findAll() {
    return this.coreService.send('SALES:FIND');
  }

  @Get('store/:id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'SALE', enum: ['SALE'] },
    {
      name: 'permission',
      required: true,
      example: 'READ:SECTION',
      enum: ['READ:SECTION'],
    },
  ])
  findStoreSales(@Param() data: ValidateUUID, @Req() req: express.Request) {
    const user = req.user as JwtPayload;

    return this.coreService.send('SALES:FIND:STORE', {
      user: user.userId,
      id: data.id,
    });
  }

  @Get('user')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'SALE', enum: ['SALE'] },
    {
      name: 'permission',
      required: true,
      example: 'READ:SECTION',
      enum: ['READ:SECTION'],
    },
  ])
  findUserSales(@Req() req: express.Request) {
    const user = req.user as JwtPayload;

    return this.coreService.send('SALES:FIND:USER', {
      user: user.userId,
      id: user.userId,
    });
  }

  @Get('/:id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'SALE', enum: ['SALE'] },
    {
      name: 'permission',
      required: true,
      example: 'READ:ONE',
      enum: ['READ:ONE'],
    },
  ])
  findOne(@Body() data: ValidateUUID) {
    return this.coreService.send('SALES:ONE', data);
  }

  @Delete()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'SALE', enum: ['SALE'] },
    { name: 'permission', required: true, example: 'DELETE', enum: ['DELETE'] },
  ])
  remove(@Body() data: ValidateUUID, @Req() req: express.Request) {
    const user = req.user as JwtPayload;

    return this.coreService.send('SALES:DELETE', {
      ...data,
      user: user.userId,
    });
  }
}
