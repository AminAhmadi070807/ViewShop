import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../../core.service';
import { ProductDto } from './product.dto';

@Controller('core/parent/product')
export class ProductController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: ProductDto) {
    return this.coreService.send('PRODUCT:CREATE', data);
  }
}
