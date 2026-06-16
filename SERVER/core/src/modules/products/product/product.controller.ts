import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductDto, UpdateProductDto } from '../dto/product.dto';
import { ValidateUUID } from '../../../common/validations/id.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('PRODUCT:CHILD:CREATE')
  create(@Payload() data: ProductDto) {
    return this.productService.create(data);
  }

  @MessagePattern('PRODUCT:CHILD:FIND')
  findAll() {
    return this.productService.findAll();
  }

  @MessagePattern('PRODUCT:CHILD:ONE')
  findOne(@Payload() data: ValidateUUID) {
    return this.productService.findOne(data.id);
  }

  @MessagePattern('PRODUCT:CHILD:UPDATE')
  update(@Payload() data: UpdateProductDto) {
    return this.productService.update(data);
  }
}
