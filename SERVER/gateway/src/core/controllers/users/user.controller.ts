import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { UserUpdateValidator, UserValidator } from './user.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import { statusMessages } from '../../../common/messages/status.message';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';

@Controller('core/users')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class UsersController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiConflictResponse({ description: statusMessages.fa['404'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'USER', enum: ['USER'] },
    { name: 'permission', required: true, example: 'CREATE', enum: ['CREATE'] },
  ])
  create(@Body() data: UserValidator) {
    return this.coreService.send('USER:CREATE', data);
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'USER', enum: ['USER'] },
    { name: 'permission', required: true, example: 'READ', enum: ['READ'] },
  ])
  findAll() {
    return this.coreService.send('USER:FIND');
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'USER', enum: ['USER'] },
    {
      name: 'permission',
      required: true,
      example: 'READ:PROFILE',
      enum: ['READ:PROFILE'],
    },
  ])
  profile(@Req() req: express.Request) {
    const user = req.user as JwtPayload;

    return this.coreService.send('USER:ONE', { id: user.userId });
  }

  @Get(':id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'USER', enum: ['USER'] },
    {
      name: 'permission',
      required: true,
      example: 'READ:ONE',
      enum: ['READ:ONE'],
    },
  ])
  findOne(@Param() data: ValidateUUID) {
    return this.coreService.send('USER:ONE', { id: data.id });
  }

  @Patch()
  @ApiOkResponse({ description: statusMessages.fa['204'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'USER', enum: ['USER'] },
    { name: 'permission', required: true, example: 'UPDATE', enum: ['UPDATE'] },
  ])
  update(@Body() data: UserUpdateValidator) {
    return this.coreService.send('USER:UPDATE', data);
  }
}
