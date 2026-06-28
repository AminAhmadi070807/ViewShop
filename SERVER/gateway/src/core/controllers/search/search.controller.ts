import { CoreService } from '../../core.service';
import { Controller, Get } from '@nestjs/common';

@Controller('search')
export class SearchController {
  constructor(private readonly coreService: CoreService) {}

  @Get()
  findAll() {
    return this.coreService.send('SEARCH:FIND');
  }
}
