import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { StoryDto } from './story.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller()
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
@ApiUnauthorizedResponse({ description: statusMessages.fa['403'] })
export class StoryController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  create(@Body() data: StoryDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('STORY:CREATE', {
      user: user.userId,
      ...data,
    });
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findAll() {
    return this.coreService.send('STORY:FIND:ALL');
  }

  @Get('/:id')
  findStore(@Param() data: ValidateUUID) {
    return this.coreService.send('STORY:FIND:STORE', data);
  }

  @Get('/:id')
  delete(@Param() data: ValidateUUID) {
    return this.coreService.send('STORY:DELETE', data);
  }
}
