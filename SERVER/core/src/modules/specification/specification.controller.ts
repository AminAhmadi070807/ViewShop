import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SpecificationService } from './specification.service';
import { ProductFilterDto } from './dto/product-filter.dto';
import { Validate } from '../../common/validations/validate.dto';

@Controller()
export class SpecificationController {
  constructor(private readonly specificationService: SpecificationService) {}

  @MessagePattern('PRODUCT:FILTER:CREATE')
  create(@Payload() data: ProductFilterDto) {
    return this.specificationService.create(data);
  }

  @MessagePattern('PRODUCT:FILTER:FIND')
  findAll() {
    return this.specificationService.findAll();
  }

  @MessagePattern('PRODUCT:FILTER:ONE')
  findOne(@Payload() data: Validate) {
    return this.specificationService.findOne(data.id);
  }

  @MessagePattern('PRODUCT:FILTER:DELETE')
  remove(@Payload() data: Validate) {
    return this.specificationService.remove(data.id);
  }
}
