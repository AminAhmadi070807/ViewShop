import { CoreService } from '../../core.service';
import { Body, Controller, Delete, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import { ProductFilterDto } from './search.dto';

@Controller('core/search')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class SearchController {
  constructor(private readonly coreService: CoreService) {}

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'SEARCH',
      enum: ['SEARCH'],
    },
    {
      name: 'permission',
      required: true,
      example: 'READ',
      enum: ['READ'],
    },
  ])
  findAll() {
    return this.coreService.send('SEARCH:FIND');
  }

  @Get('/search')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'SEARCH',
      enum: ['SEARCH'],
    },
    {
      name: 'permission',
      required: true,
      example: 'CREATE',
      enum: ['CREATE'],
    },
  ])
  search(@Query() data: ProductFilterDto) {
    return this.coreService.send('SEARCH:SEARCH', data);
  }

  @Delete()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'SEARCH',
      enum: ['SEARCH'],
    },
    {
      name: 'permission',
      required: true,
      example: 'DELETE',
      enum: ['DELETE'],
    },
  ])
  delete(@Body() data: ValidateUUID) {
    return this.coreService.send('SEARCH:DELETE', data);
  }
}
