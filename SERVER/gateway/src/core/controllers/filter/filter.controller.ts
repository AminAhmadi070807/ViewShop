import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { FilterDto } from './filter.dto';
import { ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('core/filter')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class FilterController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: FilterDto) {
    return this.coreService.send('FILTER:CREATE', data);
  }
}
