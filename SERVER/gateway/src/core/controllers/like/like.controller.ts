import { CoreService } from '../../core.service';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { LikeDto } from './like.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';

@Controller('core/likes')
export class LikeController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  toggle(@Body() data: LikeDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('LIKE:TOGGLE', {
      user: user.userId,
      product: data.product,
    });
  }
}
