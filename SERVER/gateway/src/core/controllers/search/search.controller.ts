import { CoreService } from '../../core.service';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('search')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class SearchController {
  constructor(private readonly coreService: CoreService) {}

  @Get()
  findAll() {
    return this.coreService.send('SEARCH:FIND');
  }

  @Get('search')
  search(@Query('search') search: string) {
    return this.coreService.send('SEARCH:SEARCH', search);
  }
}
