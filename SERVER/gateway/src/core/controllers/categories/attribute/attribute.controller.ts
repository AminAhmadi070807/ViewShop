import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CoreService } from '../../../core.service';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../../common/messages/status.message';
import { AttributeCategoryDto } from './attribute.dto';
import { ValidateUUID } from '../../../../common/validation/uuid.dto';

@Controller('core/attribute/categories')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class AttributeController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  create(@Body() data: AttributeCategoryDto) {
    return this.coreService.send('CATEGORY:ATTRIBUTE:CREATE', data);
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findAll() {
    return this.coreService.send('CATEGORY:ATTRIBUTE:FIND');
  }

  @Get('/:id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findOne(@Param() data: ValidateUUID) {
    return this.coreService.send('CATEGORY:ATTRIBUTE:ONE', data);
  }

  @Delete('delete/:id')
  delete(@Param() data: ValidateUUID) {
    return this.coreService.send('CATEGORY:ATTRIBUTE:DELETE', data);
  }
}
