import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../../core.service';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../../common/messages/status.message';
import { AttributeCategoryDto } from './attribute.dto';

@Controller('core/attribute/categories')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class AttributeController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  create(@Body() data: AttributeCategoryDto) {
    return this.coreService.send('CATEGORY:ATTRIBUTE:CREATE', data);
  }
}
