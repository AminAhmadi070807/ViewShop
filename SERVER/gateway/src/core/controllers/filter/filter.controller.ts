import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { FilterDto } from './filter.dto';

@Controller('core/filter')
export class FilterController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: FilterDto) {
    return this.coreService.send('FILTER:CREATE', data);
  }
}
