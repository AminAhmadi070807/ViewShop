import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { FilterTypeDto } from './filter-type.dto';
import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('core/filter-type')
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiForbiddenResponse({ description: statusMessages.fa['403'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class FilterTypeController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: FilterTypeDto) {
    return this.coreService.send('FILTER:TYPE:CREATE', data);
  }
}
