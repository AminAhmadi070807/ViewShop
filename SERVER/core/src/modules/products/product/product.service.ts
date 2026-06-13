import { Injectable } from '@nestjs/common';
import { ProductDto } from '../dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(data: ProductDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: ProductDto) {}
}
