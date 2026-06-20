import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { ArticleDto } from './article.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';

@Controller('core/articles')
export class ArticleController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: ArticleDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('ARTICLE:CREATE', {
      author: user.userId,
      ...data,
    });
  }

  @Get()
  findAll() {
    return this.coreService.send('ARTICLE:FIND');
  }

  @Get('/:id')
  findOne() {
    return this.coreService.send('ARTICLE:ONE');
  }
}
