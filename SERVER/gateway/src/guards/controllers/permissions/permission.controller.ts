import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GuardsService } from '../../guards.service';
import { CreatePermissionDto, PermissionUUID } from './permission.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('guards/permissions')
export class PermissionsController {
  constructor(private readonly guardsService: GuardsService) {}

  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
  @Post()
  create(@Body() data: CreatePermissionDto) {
    return this.guardsService.send('PERMISSION:CREATE', data);
  }

  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
  @Get()
  findAll() {
    return this.guardsService.send('PERMISSION:FIND');
  }

  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
  @Get(':id')
  findOne(@Param() data: PermissionUUID) {
    return this.guardsService.send('PERMISSION:ONE', data.id);
  }

  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
  @Delete(':id')
  remove(@Param() data: PermissionUUID) {
    return this.guardsService.send('PERMISSION:REMOVE', data.id);
  }
}
