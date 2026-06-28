import { CoreService } from '../../core.service';
import { Body, Controller, Delete, Get, Param, Query } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import { SearchDto } from './search.dto';

@Controller('core/search')
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
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
  search(@Body() data: SearchDto) {
    return this.coreService.send('SEARCH:SEARCH', data);
  }

  @Delete('/:id')
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  delete(@Param() data: ValidateUUID) {
    return this.coreService.send('SEARCH:DELETE', data);
  }
}
