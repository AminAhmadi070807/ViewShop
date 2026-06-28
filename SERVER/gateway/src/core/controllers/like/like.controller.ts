import { CoreService } from '../../core.service';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { LikeDto } from './like.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import {
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('core/likes')
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
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
