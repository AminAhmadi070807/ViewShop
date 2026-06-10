import { Controller } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ValidateUUID } from '../../../common/validations/id.dto';

@Controller()
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @MessagePattern('CATEGORY:ATTRIBUTE:CREATE')
  create(@Payload() data: null) {
    return this.attributeService.create(data);
  }

  @MessagePattern('CATEGORY:ATTRIBUTE:FIND')
  findAll() {
    return this.attributeService.findAll();
  }

  @MessagePattern('CATEGORY:ATTRIBUTE:ONE')
  findOne(@Payload() data: ValidateUUID) {
    return this.attributeService.findOne(data.id);
  }

  @MessagePattern('CATEGORY:ATTRIBUTE:UPDATE')
  update(@Payload() data: null) {
    return this.attributeService.update(data);
  }

  @MessagePattern('CATEGORY:ATTRIBUTE:DELETE')
  delete(@Payload() data: ValidateUUID) {
    return this.attributeService.delete(data.id);
  }
}
