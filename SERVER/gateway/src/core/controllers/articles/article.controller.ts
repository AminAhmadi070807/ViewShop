import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { CoreService } from '../../core.service';
import {
  ArticleDto,
  UpdateArticleDto,
  UpdateArticleStatusDto,
} from './article.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('core/articles')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
@ApiBadRequestResponse({ description: statusMessages.fa['403'] })
export class ArticleController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  create(@Body() data: ArticleDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('ARTICLE:CREATE', {
      author: user.userId,
      ...data,
    });
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findAll() {
    return this.coreService.send('ARTICLE:FIND');
  }

  @Get('/:id')
  findOne() {
    return this.coreService.send('ARTICLE:ONE');
  }

  @Patch()
  update(@Body() data: UpdateArticleDto) {
    return this.coreService.send('ARTICLE:UPDATE', data);
  }

  @Patch('status')
  updateStatus(@Body() data: UpdateArticleStatusDto) {
    return this.coreService.send('ARTICLE:UPDATE:STATUS', data);
  }
}
