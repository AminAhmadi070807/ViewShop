import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductDto } from '../dto/product.dto';
import { ValidateUUID } from '../../../common/validations/id.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('PRODUCT:CHILD:CREATE')
  create(@Payload() data: ProductDto) {}

  @MessagePattern('PRODUCT:CHILD:FIND')
  findAll(@Payload() data: ProductDto) {}

  @MessagePattern('PRODUCT:CHILD:ONE')
  findOne(@Payload() data: ProductDto) {}

  @MessagePattern('PRODUCT:CHILD:UPDATE')
  update(@Payload() data: ProductDto) {}

  @MessagePattern('PRODUCT:CHILD:DELETE')
  delete(@Payload() data: ValidateUUID) {}
}
