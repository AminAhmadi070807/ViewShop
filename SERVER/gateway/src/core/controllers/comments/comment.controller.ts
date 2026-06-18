import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { CommentDto } from './comment.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('core/comments')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
@ApiUnauthorizedResponse({ description: statusMessages.fa['403'] })
export class ProductController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  create(@Body() data: CommentDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('COMMENT:CREATE', {
      user: user.userId,
      ...data,
    });
  }

  @Get()
  findAll() {
    return this.coreService.send('COMMENT:FIND');
  }
}
