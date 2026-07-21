import { Controller } from '@nestjs/common';
import { ParentProductsService } from './parent.products.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  ParentProductDto,
  UpdateParentProductDto,
} from '../dto/parent.product.dto';
import { Validate } from '../../../common/validations/validate.dto';

@Controller()
export class ParentProductController {
  constructor(private readonly parentProductService: ParentProductsService) {}

  @MessagePattern('PRODUCT:PARENT:CREATE')
  create(@Payload() data: ParentProductDto) {
    return this.parentProductService.create(data);
  }

  @MessagePattern('PRODUCT:PARENT:FIND')
  findAll() {
    return this.parentProductService.findAll();
  }

  @MessagePattern('PRODUCT:PARENT:ONE')
  findOne(@Payload() data: Validate) {
    return this.parentProductService.findOne(data.id);
  }

  @MessagePattern('PRODUCT:PARENT:UPDATE')
  update(@Payload() data: UpdateParentProductDto) {
    return this.parentProductService.update(data);
  }

  @MessagePattern('PRODUCT:PARENT:DELETE')
  remove(@Payload() data: Validate) {
    return this.parentProductService.remove(data.id);
  }
}
