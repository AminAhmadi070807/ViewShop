import { Injectable } from '@nestjs/common';
import { CreateProductFilterDto } from './dto/create-product-filter.dto';
import { UpdateProductFilterDto } from './dto/update-product-filter.dto';

@Injectable()
export class ProductFiltersService {
  create(createProductFilterDto: CreateProductFilterDto) {
    return 'This action adds a new productFilter';
  }

  findAll() {
    return `This action returns all productFilters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productFilter`;
  }

  update(id: number, updateProductFilterDto: UpdateProductFilterDto) {
    return `This action updates a #${id} productFilter`;
  }

  remove(id: number) {
    return `This action removes a #${id} productFilter`;
  }
}
