import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { StoryDto } from './story.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import { ValidateUUID } from '../../../common/validation/uuid.dto';

@Controller()
export class StoryController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: StoryDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('STORY:CREATE', {
      user: user.userId,
      ...data,
    });
  }

  @Get()
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
