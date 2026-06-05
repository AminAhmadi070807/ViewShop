import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CoreService } from '../../../core.service';
import { CategoryDto, UpdateCategoryDto } from './category.dto';
import express from 'express';
import { JwtPayload } from '../../../../common/validation/jwt.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
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
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  findOne(@Param() data: ValidateUUID) {
    return this.coreService.send('CATEGORY:ONE', data);
  }

  @Post('update')
  @ApiCreatedResponse({ description: statusMessages.fa['204'] })
  update(@Body() data: UpdateCategoryDto) {
    return this.coreService.send('CATEGORY:CREATE', {
      id: data.id,
      title: data.title,
      link: data.link,
      icon: data.icon,
    });
  }
}
