import { Controller } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ValidateUUID } from '../../../common/validations/id.dto';

@Controller()
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @MessagePattern('CATEGORY:ATTRIBUTE:CREATE')
  create(@Payload() data: null) {}

  @MessagePattern('CATEGORY:ATTRIBUTE:FIND')
  findAll() {}

  @MessagePattern('CATEGORY:ATTRIBUTE:ONE')
  findOne(@Payload() data: ValidateUUID) {}

  @MessagePattern('CATEGORY:ATTRIBUTE:UPDATE')
  update(@Payload() data: null) {}

  @MessagePattern('CATEGORY:ATTRIBUTE:DELETE')
  delete(@Payload() data: ValidateUUID) {}
}
