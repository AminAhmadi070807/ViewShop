import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../../core.service';
import { ParentProductDto } from './parent.product.dto';

@Controller('core/parent/product')
export class ParentProductController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: ParentProductDto) {
    return this.coreService.send('PRODUCT:PARENT:CREATE', data);
  }
}
