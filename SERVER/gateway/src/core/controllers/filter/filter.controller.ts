import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { FilterDto } from './filter.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('core/filter')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class FilterController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  create(@Body() data: FilterDto) {
    return this.coreService.send('FILTER:CREATE', data);
  }
}
