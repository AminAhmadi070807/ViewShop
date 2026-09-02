import { Injectable } from '@nestjs/common';
import { ProductFilterDto } from './dto/product-filter.dto';

@Injectable()
export class ProductFiltersService {
  create(data: ProductFilterDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: ProductFilterDto) {}

  remove(id: string) {}
}
