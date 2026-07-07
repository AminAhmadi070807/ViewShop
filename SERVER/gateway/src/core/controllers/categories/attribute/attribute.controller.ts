import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { CoreService } from '../../../core.service';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../../common/messages/status.message';
import { AttributeCategoryDto } from './attribute.dto';
import { ValidateUUID } from '../../../../common/validation/uuid.dto';
import express from 'express';
import { JwtPayload } from '../../../../common/validation/jwt.dto';

@Controller('core/attribute/categories')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class AttributeController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  create(@Body() data: AttributeCategoryDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('CATEGORY:ATTRIBUTE:CREATE', {
      user: user.userId,
      ...data,
    });
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findAll() {
    return this.coreService.send('CATEGORY:ATTRIBUTE:FIND');
  }

  @Get('/:id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  findOne(@Param() data: ValidateUUID) {
    return this.coreService.send('CATEGORY:ATTRIBUTE:ONE', data);
  }

  @Delete()
  @ApiNoContentResponse({ description: statusMessages.fa['200'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  delete(@Body() data: ValidateUUID) {
    return this.coreService.send('CATEGORY:ATTRIBUTE:DELETE', data);
  }
}
