import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { FilterTypeDto } from './filter-type.dto';
import { ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('core/filter-type')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class FilterTypeController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: FilterTypeDto) {
    return this.coreService.send('FILTER:TYPE:CREATE', data);
  }
}
