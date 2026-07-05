import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Headers,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { GuardsService } from '../../guards.service';
import { CreatePermissionDto } from './permission.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import uuid from 'uuid';

@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiForbiddenResponse({ description: statusMessages.fa['403'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
@Controller('guards/permissions')
export class PermissionsController {
  constructor(private readonly guardsService: GuardsService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  create(@Body() data: CreatePermissionDto) {
    return this.guardsService.send('PERMISSION:CREATE', data);
  }

  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @Get('read/all')
  findAll() {
    return this.guardsService.send('PERMISSION:FIND');
  }

  @Get('read/one')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeader({
    name: 'id',
    required: true,
    example: '',
  })
  findOne(@Headers('id') id: string) {
    if (!uuid.validate(id)) {
      throw new BadRequestException('شناسه نامعتبر هست');
    }

    return this.guardsService.send('PERMISSION:ONE', { id });
  }

  @Delete()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  remove(@Body() data: ValidateUUID) {
    return this.guardsService.send('PERMISSION:DELETE', data);
  }
}
