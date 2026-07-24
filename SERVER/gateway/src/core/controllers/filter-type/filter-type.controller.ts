import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { FilterTypeDto } from './filter-type.dto';

@Controller('core/filter-type')
export class FilterTypeController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: FilterTypeDto) {
    return this.coreService.send('FILTER:TYPE:CREATE', data);
  }
}
