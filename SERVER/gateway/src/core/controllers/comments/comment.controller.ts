import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CoreService } from '../../core.service';
import { CommentDto, UpdateCommentDto } from './comment.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';
import { ValidateUUID } from '../../../common/validation/uuid.dto';

@Controller('core/comments')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
export class CommentController {
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
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findAll() {
    return this.coreService.send('COMMENT:FIND');
  }

  @Get('/:id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findComment(@Param() data: ValidateUUID) {
    return this.coreService.send('COMMENT:FIND:PRODUCT', data);
  }

  @Patch()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  update(@Body() data: UpdateCommentDto) {
    return this.coreService.send('COMMENT:UPDATE', data);
  }

  @Delete('/:id')
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  delete(@Param() data: ValidateUUID) {
    return this.coreService.send('COMMENT:DELETE', data);
  }
}
