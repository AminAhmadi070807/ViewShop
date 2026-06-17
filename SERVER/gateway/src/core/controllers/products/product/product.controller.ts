import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CoreService } from '../../../core.service';
import { ProductDto, UpdateProductDto } from './product.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../../common/messages/status.message';
import { ValidateUUID } from '../../../../common/validation/uuid.dto';

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
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findAll() {
    return this.coreService.send('PRODUCT:FIND');
  }

  @Get('/:id')
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  findOne(@Param() data: ValidateUUID) {
    return this.coreService.send('PRODUCT:ONE', data);
  }

  @Patch()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  update(@Body() data: UpdateProductDto) {
    return this.coreService.send('PRODUCT:UPDATE', data);
  }
}
