import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CoreService } from '../../core.service';
import {
  ProductDto,
  UpdateProductDto,
  UpdateStatusProductDto,
  UpdateStockProductDto,
} from './product.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
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
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';

@Controller('core/product')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class ProductController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'PRODUCT', enum: ['PRODUCT'] },
    { name: 'permission', required: true, example: 'CREATE', enum: ['CREATE'] },
  ])
  create(@Body() data: ProductDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('PRODUCT:CREATE', {
      ...data,
      userId: user.userId,
    });
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'PRODUCT',
      enum: ['PRODUCT'],
    },
    {
      name: 'permission',
      required: true,
      example: 'READ',
      enum: ['READ'],
    },
  ])
  findAll() {
    return this.coreService.send('PRODUCT:FIND');
  }

  @Get('/:id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'PRODUCT',
      enum: ['PRODUCT'],
    },
    {
      name: 'permission',
      required: true,
      example: 'READ:ONE',
      enum: ['READ:ONE'],
    },
  ])
  findOne(@Param() data: ValidateUUID) {
    return this.coreService.send('PRODUCT:ONE', data);
  }

  @Patch()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'PRODUCT',
      enum: ['PRODUCT'],
    },
    {
      name: 'permission',
      required: true,
      example: 'UPDATE',
      enum: ['UPDATE'],
    },
  ])
  update(@Body() data: UpdateProductDto) {
    return this.coreService.send('PRODUCT:UPDATE', data);
  }

  @Patch('stock')
  @ApiNoContentResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'PRODUCT', enum: ['PRODUCT'] },
    {
      name: 'permission',
      required: true,
      example: 'UPDATE:STOCK',
      enum: ['UPDATE:STOCK'],
    },
  ])
  updateStock(@Body() data: UpdateStockProductDto) {
    return this.coreService.send('PRODUCT:UPDATE:STOCK', data);
  }

  @Put('status')
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'PRODUCT', enum: ['PRODUCT'] },
    {
      name: 'permission',
      required: true,
      example: 'UPDATE:STATUS',
      enum: ['UPDATE:STATUS'],
    },
  ])
  updateStatus(@Body() data: UpdateStatusProductDto) {
    return this.coreService.send('PRODUCT:UPDATE:STATUS', data);
  }

  @Delete()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'PRODUCT', enum: ['PRODUCT'] },
    { name: 'permission', required: true, example: 'DELETE', enum: ['DELETE'] },
  ])
  remove(@Body() data: ValidateUUID) {
    return this.coreService.send('PRODUCT:DELETE', data);
  }
}
