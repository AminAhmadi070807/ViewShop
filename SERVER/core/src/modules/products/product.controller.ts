import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ParentProductDto } from './dto/parent.product.dto';
import { ValidateUUID } from '../../common/validations/id.dto';

@Controller()
export class ProductController {
  constructor(private readonly parentProductService: ProductsService) {}

  @MessagePattern('PRODUCT:PARENT:CREATE')
  create(@Payload() data: ParentProductDto) {
    return this.parentProductService.create(data);
  }

  @MessagePattern('PRODUCT:PARENT:FIND')
  findAll() {
    return this.parentProductService.findAll();
  }

  @MessagePattern('PRODUCT:PARENT:ONE')
  findOne(@Payload() data: ValidateUUID) {
    return this.parentProductService.findOne(data.id);
  }

  @MessagePattern('PRODUCT:PARENT:UPDATE')
  update(@Payload() data: ParentProductDto) {
    return this.parentProductService.update(data);
  }

  @MessagePattern('PRODUCT:PARENT:DELETE')
  remove(@Payload() data: ValidateUUID) {
    return this.parentProductService.remove(data.id);
  }
}
