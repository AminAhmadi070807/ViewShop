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
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import { statusMessages } from '../../../common/messages/status.message';
import { AddressDto } from './address.dto';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';

@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
@Controller('core/addresses')
export class AddressController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'USER',
      enum: ['USER'],
    },
    {
      name: 'permission',
      required: true,
      example: 'CREATE',
      enum: ['CREATE'],
    },
  ])
  create(@Body() data: AddressDto, @Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.coreService.send('ADDRESS:CREATE', {
      user: user.userId,
      ...data,
    });
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'USER',
      enum: ['USER'],
    },
    {
      name: 'permission',
      required: true,
      example: 'READ',
      enum: ['READ'],
    },
  ])
  findAll(@Req() req: express.Request) {
    const user = req.user as JwtPayload;

    return this.coreService.send('ADDRESS:FIND', {
      user: user.userId,
      id: user.userId,
      role: user.role,
    });
  }

  @Get('/:id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'USER',
      enum: ['USER'],
    },
    {
      name: 'permission',
      required: true,
      example: 'READ:ONE',
      enum: ['READ:ONE'],
    },
  ])
  findOne(@Param() data: ValidateUUID) {
    return this.coreService.send('ADDRESS:ONE', data);
  }

  @Delete()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'USER',
      enum: ['USER'],
    },
    {
      name: 'permission',
      required: true,
      example: 'DELETE',
      enum: ['DELETE'],
    },
  ])
  delete(@Body() data: ValidateUUID) {
    return this.coreService.send('ADDRESS:DELETE', data);
  }
}
