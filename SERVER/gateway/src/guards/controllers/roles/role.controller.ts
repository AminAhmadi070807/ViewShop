import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GuardsService } from '../../guards.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import { RoleDto } from './role.dto';

@ApiBadRequestResponse({ description: statusMessages.fa['400'] })
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiForbiddenResponse({ description: statusMessages.fa['403'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
@Controller('guards/roles')
export class RoleController {
  constructor(private readonly guardsService: GuardsService) {}

  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @Post()
  create(@Body() data: RoleDto) {
    return this.guardsService.send('ROLE:CREATE', data);
  }

  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @Get()
  findAll() {
    return this.guardsService.send('ROLE:FIND');
  }

  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @Get(':id')
  findOne(@Param() data: ValidateUUID) {
    return this.guardsService.send('ROLE:ONE', data);
  }

  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @Delete(':id')
  remove(@Param() data: ValidateUUID) {
    return this.guardsService.send('ROLE:REMOVE', data);
  }
}
