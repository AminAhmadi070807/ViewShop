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
import { CoreService } from '../../../core.service';
import {
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
import { statusMessages } from '../../../../common/messages/status.message';
import { SubCategoryDto, UpdateSubCategoryDto } from './sub.category.dto';
import express from 'express';
import { JwtPayload } from '../../../../common/validation/jwt.dto';
import { ValidateUUID } from '../../../../common/validation/uuid.dto';

@Controller('core/sub/categories/')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class SubCategoryController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'CATEGORY:SUB',
      enum: ['CATEGORY:SUB'],
    },
    {
      name: 'permission',
      required: true,
      example: 'CREATE',
      enum: ['CREATE'],
    },
  ])
  create(@Body() data: SubCategoryDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('CATEGORY:SUB:CREATE', {
      user: user.userId,
      ...data,
    });
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findAll() {
    return this.coreService.send('CATEGORY:SUB:FIND');
  }

  @Get('/:id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  findOne(@Param() data: ValidateUUID) {
    return this.coreService.send('CATEGORY:SUB:ONE', data);
  }

  @Patch()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  update(@Body() data: UpdateSubCategoryDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('CATEGORY:SUB:UPDATE', {
      user: user.userId,
      ...data,
    });
  }

  @Delete()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  delete(@Body() data: ValidateUUID) {
    return this.coreService.send('CATEGORY:SUB:DELETE', data);
  }
}
