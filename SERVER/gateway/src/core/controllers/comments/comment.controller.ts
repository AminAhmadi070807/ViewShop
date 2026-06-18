import { Body, Controller, Post, Req } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { CommentDto } from './comment.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';

@Controller('core/comments')
export class ProductController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: CommentDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('COMMENT:CREATE', {
      user: user.userId,
      ...data,
    });
  }
}
