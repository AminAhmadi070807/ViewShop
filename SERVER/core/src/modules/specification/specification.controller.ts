import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SpecificationService } from './specification.service';
import {
  SpecificationDto,
  UpdateSpecificationDto,
} from './dto/specification.dto';
import { Validate } from '../../common/validations/validate.dto';

@Controller()
export class SpecificationController {
  constructor(private readonly specificationService: SpecificationService) {}

  @MessagePattern('SPECIFICATION:CREATE')
  create(@Payload() data: SpecificationDto) {
    return this.specificationService.create(data);
  }

  @MessagePattern('SPECIFICATION:FIND')
  findAll() {
    return this.specificationService.findAll();
  }

  @MessagePattern('SPECIFICATION:ONE')
  findOne(@Payload() data: Validate) {
    return this.specificationService.findOne(data.id);
  }

  @MessagePattern('SPECIFICATION:ONE')
  update(@Payload() data: UpdateSpecificationDto) {
    return this.specificationService.update(data);
  }

  @MessagePattern('SPECIFICATION:DELETE')
  remove(@Payload() data: Validate) {
    return this.specificationService.remove(data.id);
  }
}
