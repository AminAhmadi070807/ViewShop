import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CoreService } from '../../../core.service';
import { CategoryDto } from './category.dto';
import express from 'express';
import { JwtPayload } from '../../../../common/validation/jwt.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../../common/messages/status.message';
import { ValidateUUID } from '../../../../common/validation/uuid.dto';

@Controller('core/categories')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class CategoryController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  create(@Body() data: CategoryDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('CATEGORY:CREATE', {
      user: user.userId,
      title: data.title,
      link: data.link,
      icon: data.icon,
    });
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findAll() {
    return this.coreService.send('CATEGORY:FIND');
  }

  @Get('/:id')
  findOne(@Param() data: ValidateUUID) {
    return this.coreService.send('CATEGORY:ONE', data);
  }
}
