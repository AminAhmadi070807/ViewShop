import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CoreService } from '../../../core.service';
import { ParentProductDto } from './parent.product.dto';
import express from 'express';
import { JwtPayload } from '../../../../common/validation/jwt.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../../common/messages/status.message';

@Controller('core/parent/product')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class ParentProductController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiNoContentResponse({ description: statusMessages.fa['404'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  create(@Body() data: ParentProductDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('PRODUCT:PARENT:CREATE', {
      userId: user.userId,
      ...data,
    });
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findAll() {
    return this.coreService.send('PRODUCT:PARENT:FIND');
  }
}
