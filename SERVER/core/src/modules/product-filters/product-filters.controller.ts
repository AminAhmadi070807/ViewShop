import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductFiltersService } from './product-filters.service';
import { ProductFilterDto } from './dto/product-filter.dto';
import { Validate } from '../../common/validations/validate.dto';

@Controller()
export class ProductFiltersController {
  constructor(private readonly productFiltersService: ProductFiltersService) {}

  @MessagePattern('PRODUCT:FILTER:CREATE')
  create(@Payload() data: ProductFilterDto) {
    return this.productFiltersService.create(data);
  }

  @MessagePattern('PRODUCT:FILTER:FIND')
  findAll() {
    return this.productFiltersService.findAll();
  }

  @MessagePattern('PRODUCT:FILTER:ONE')
  findOne(@Payload() data: Validate) {
    return this.productFiltersService.findOne(data.id);
  }

  @MessagePattern('PRODUCT:FILTER:UPDATE')
  update(@Payload() data: ProductFilterDto) {
    return this.productFiltersService.update(data);
  }

  @MessagePattern('PRODUCT:FILTER:DELETE')
  remove(@Payload() data: Validate) {
    return this.productFiltersService.remove(data.id);
  }
}
