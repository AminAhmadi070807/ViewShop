import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { SpecificationDto } from './specification.dto';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('core/specification')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class SpecificationController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  create(@Body() data: SpecificationDto) {
    return this.coreService.send('SPECIFICATION:CREATE', data);
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  findAll() {
    return this.coreService.send('SPECIFICATION:FIND');
  }

  @Get(':id')
  findOne(@Param() data: ValidateUUID) {
    return this.coreService.send('SPECIFICATION:ONE', data);
  }

  @Delete()
  remove(@Body() data: ValidateUUID) {
    return this.coreService.send('SPECIFICATION:DELETE', data);
  }
}
