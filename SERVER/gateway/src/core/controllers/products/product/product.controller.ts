import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoreService } from '../../../core.service';
import { ProductDto } from './product.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../../common/messages/status.message';

@Controller('core/parent/product')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class ProductController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  create(@Body() data: ProductDto) {
    return this.coreService.send('PRODUCT:CREATE', data);
  }

  @Get()
  findAll() {
    return this.coreService.send('PRODUCT:FIND');
  }
}
