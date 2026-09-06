import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { CoreService } from '../../core.service';
import { StoryDto } from './story.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('core/story')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class StoryController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'STORY', enum: ['STORY'] },
    { name: 'permission', required: true, example: 'CREATE', enum: ['CREATE'] },
  ])
  create(@Body() data: StoryDto, @Req() req: express.Request) {
    const user = req.user as JwtPayload;

    return this.coreService.send('STORY:CREATE', {
      user: user.userId,
      ...data,
    });
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'STORY', enum: ['STORY'] },
    { name: 'permission', required: true, example: 'READ', enum: ['READ'] },
  ])
  findAll() {
    return this.coreService.send('STORY:FIND');
  }

  @Get('/:id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'STORY', enum: ['STORY'] },
    {
      name: 'permission',
      required: true,
      example: 'READ:ONE',
      enum: ['READ:ONE'],
    },
  ])
  findOne(@Param() data: ValidateUUID) {
    return this.coreService.send('STORY:ONE', data);
  }

  @Delete()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'STORY', enum: ['STORY'] },
    { name: 'permission', required: true, example: 'DELETE', enum: ['DELETE'] },
  ])
  delete(@Body() data: ValidateUUID) {
    return this.coreService.send('STORY:DELETE', data);
  }
}
