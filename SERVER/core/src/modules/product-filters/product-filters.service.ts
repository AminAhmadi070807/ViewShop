import { Injectable } from '@nestjs/common';
import { ProductFilterDto } from './dto/product-filter.dto';

@Injectable()
export class ProductFiltersService {
  create(data: ProductFilterDto) {
    return 'This action adds a new productFilter';
  }

  findAll() {
    return `This action returns all productFilters`;
  }

  findOne(id: string) {
    return `This action returns a #${id} productFilter`;
  }

  update(data: ProductFilterDto) {
    return `This action updates a productFilter`;
  }

  remove(id: string) {
    return `This action removes a #${id} productFilter`;
  }
}
