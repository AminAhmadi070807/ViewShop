import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductDto } from '../dto/product.dto';
import { ValidateUUID } from '../../../common/validations/id.dto';

@Injectable()
export class ProductService {
  create(data: ProductDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: ProductDto) {}

  delete(id: string) {}
}
