import { Controller } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Validate } from '../../../common/validations/validate.dto';
import { AttributeCategoryDto } from '../dto/attribute.category.dto';
import { PageFilter } from '../../../common/filters/page.filter';

@Controller()
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @MessagePattern('CATEGORY:ATTRIBUTE:CREATE')
  create(@Payload() data: AttributeCategoryDto) {
    return this.attributeService.create(data);
  }

  @MessagePattern('CATEGORY:ATTRIBUTE:FIND')
  findAll(@Payload() data: PageFilter) {
    return this.attributeService.findAll(data.page);
  }

  @MessagePattern('CATEGORY:ATTRIBUTE:ONE')
  findOne(@Payload() data: Validate) {
    return this.attributeService.findOne(data.id);
  }

  @MessagePattern('CATEGORY:ATTRIBUTE:DELETE')
  remove(@Payload() data: Validate) {
    return this.attributeService.remove(data.id);
  }
}
