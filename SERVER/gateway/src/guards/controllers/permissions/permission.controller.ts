import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GuardsService } from '../../guards.service';
import { CreatePermissionDto } from './permission.dto';
import {
  ApiBadRequestResponse,
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
import { ValidateUUID } from '../../../common/validation/uuid.dto';

@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiForbiddenResponse({ description: statusMessages.fa['403'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
@Controller('guards/permissions')
export class PermissionsController {
  constructor(private readonly guardsService: GuardsService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'PERMISSIONS',
      enum: ['PERMISSIONS'],
    },
    {
      name: 'permission',
      required: true,
      example: 'CREATE',
      enum: ['CREATE'],
    },
  ])
  create(@Body() data: CreatePermissionDto) {
    return this.guardsService.send('PERMISSION:CREATE', data);
  }

  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @Get()
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'PERMISSIONS',
      enum: ['PERMISSIONS'],
    },
    {
      name: 'permission',
      required: true,
      example: 'READ',
      enum: ['PERMISSIONS'],
    },
  ])
  findAll() {
    return this.guardsService.send('PERMISSION:FIND');
  }

  @Get('/:id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'PERMISSIONS',
      enum: ['PERMISSIONS'],
    },
    {
      name: 'permission',
      required: true,
      example: 'READ:ONE',
      enum: ['READ:ONE'],
    },
  ])
  findOne(@Param() data: ValidateUUID) {
    return this.guardsService.send('PERMISSION:ONE', data);
  }

  @Delete()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'PERMISSIONS',
      enum: ['PERMISSIONS'],
    },
    {
      name: 'permission',
      required: true,
      example: 'DELETE',
      enum: ['DELETE'],
    },
  ])
  remove(@Body() data: ValidateUUID) {
    return this.guardsService.send('PERMISSION:DELETE', data);
  }
}
