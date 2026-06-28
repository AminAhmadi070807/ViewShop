import { CoreService } from '../../core.service';
import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';
import { ValidateUUID } from '../../../common/validation/uuid.dto';

@Controller('search')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class SearchController {
  constructor(private readonly coreService: CoreService) {}

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findAll() {
    return this.coreService.send('SEARCH:FIND');
  }

  @Get('search')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  search(@Query('search') search: string) {
    return this.coreService.send('SEARCH:SEARCH', search);
  }

  @Delete('/:id')
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  delete(@Param() data: ValidateUUID) {
    return this.coreService.send('SEARCH:DELETE', data);
  }
}
