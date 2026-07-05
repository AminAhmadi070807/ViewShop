import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
import { CreateRoleDto, RoleDto } from './role.dto';

@ApiBadRequestResponse({ description: statusMessages.fa['400'] })
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiForbiddenResponse({ description: statusMessages.fa['403'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
@Controller('guards/roles')
export class RoleController {
  constructor(private readonly guardsService: GuardsService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  create(@Body() data: CreateRoleDto) {
    return this.guardsService.send('ROLE:CREATE', data);
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findAll() {
    return this.guardsService.send('ROLE:FIND');
  }

  @Get(':id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findOne(@Param() data: ValidateUUID) {
    return this.guardsService.send('ROLE:ONE', data);
  }

  @Patch()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  update(@Body() data: RoleDto) {
    return this.guardsService.send('ROLE:UPDATE', data);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  remove(@Param() data: ValidateUUID) {
    return this.guardsService.send('ROLE:DELETE', data);
  }
}
