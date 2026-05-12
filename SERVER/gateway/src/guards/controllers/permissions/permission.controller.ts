import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GuardsService } from '../../guards.service';
import { CreatePermissionDto } from './permission.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';
import { ValidateUUID } from '../../../common/validation/uuid.dto';

@ApiBadRequestResponse({ description: statusMessages.fa['400'] })
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiForbiddenResponse({ description: statusMessages.fa['403'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
@Controller('guards/permissions')
export class PermissionsController {
  constructor(private readonly guardsService: GuardsService) {}

  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @Post()
  create(@Body() data: CreatePermissionDto) {
    return this.guardsService.send('PERMISSION:CREATE', data);
  }

  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @Get()
  findAll() {
    return this.guardsService.send('PERMISSION:FIND');
  }

  @Get(':id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'user id',
  })
  findOne(@Param() data: ValidateUUID) {
    return this.guardsService.send('PERMISSION:ONE', data);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'user id',
  })
  remove(@Param() data: ValidateUUID) {
    return this.guardsService.send('PERMISSION:DELETE', data);
  }
}
