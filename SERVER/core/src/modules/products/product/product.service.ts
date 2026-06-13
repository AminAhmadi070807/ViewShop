import { Injectable } from '@nestjs/common';
import { ProductDto } from '../dto/product.dto';

@Injectable()
export class ProductService {
  create(data: ProductDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: ProductDto) {}
}
