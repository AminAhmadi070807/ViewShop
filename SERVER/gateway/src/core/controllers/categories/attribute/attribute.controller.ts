import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../../core.service';
import { ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { statusMessages } from '../../../../common/messages/status.message';
import { AttributeCategoryDto } from './attribute.dto';

@Controller('core/attribute/categories')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class AttributeController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: AttributeCategoryDto) {
    return this.coreService.send('CATEGORY:ATTRIBUTE:CREATE', data);
  }
}
