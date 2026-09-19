import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  ProductDto,
  UpdateProductDto,
  UpdateStatusProductDto,
} from './dto/product.dto';
import { Validate } from '../../common/validations/validate.dto';
import { ProductFilterDto } from '../search/dto/search.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('PRODUCT:CREATE')
  create(@Payload() data: ProductDto) {
    return this.productService.create(data);
  }

  @MessagePattern('PRODUCT:FIND')
  findAll(@Payload() data: ProductFilterDto) {
    return this.productService.findAll(data);
  }

  @MessagePattern('PRODUCT:ONE')
  findOne(@Payload() data: Validate) {
    return this.productService.findOne(data.id);
  }

  @MessagePattern('PRODUCT:UPDATE')
  update(@Payload() data: UpdateProductDto) {
    return this.productService.update(data);
  }

  @MessagePattern('PRODUCT:UPDATE:STATUS')
  updateStatus(@Payload() data: UpdateStatusProductDto) {
    return this.productService.updateStatus(data);
  }

  @MessagePattern('PRODUCT:DELETE')
  remove(@Payload() data: Validate) {
    return this.productService.remove(data.id);
  }
}
