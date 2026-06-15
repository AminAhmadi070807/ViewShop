import { Body, Controller, Post, Req } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { StoreDto } from './store.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';

@Controller('core/store')
export class MediaController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() storeDto: StoreDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('STORE:CREATE', {
      ...storeDto,
      user: user.userId,
    });
  }
}
