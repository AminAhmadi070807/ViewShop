import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { StoreDto } from './store.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('core/store')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class StoreController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  create(@Body() storeDto: StoreDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('STORE:CREATE', {
      ...storeDto,
      user: user.userId,
    });
  }

  @Get()
  findAll() {
    return this.coreService.send('STORE:FIND');
  }
}
