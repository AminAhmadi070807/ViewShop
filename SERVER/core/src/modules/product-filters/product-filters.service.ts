import { Injectable } from '@nestjs/common';
import { ProductFilterDto } from './dto/product-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductFilter } from './entities/product-filter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductFiltersService {
  constructor(
    @InjectRepository(ProductFilter)
    private readonly productRepository: Repository<ProductFilter>,
  ) {}

  create(data: ProductFilterDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: ProductFilterDto) {}

  remove(id: string) {}
}
