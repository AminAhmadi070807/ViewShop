import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FilterTypeService } from './filter-type.service';
import { FilterTypeDto, UpdateFilterTypeDto } from './dto/filter-type.dto';
import { Validate } from '../../common/validations/validate.dto';

@Controller()
export class FilterTypeController {
  constructor(private readonly filterTypeService: FilterTypeService) {}

  @MessagePattern('FILTER:TYPE:CREATE')
  create(@Payload() data: FilterTypeDto) {
    return this.filterTypeService.create(data);
  }

  @MessagePattern('FILTER:TYPE:FIND')
  findAll() {
    return this.filterTypeService.findAll();
  }

  @MessagePattern('FILTER:TYPE:ONE')
  findOne(@Payload() data: Validate) {
    return this.filterTypeService.findOne(data.id);
  }

  @MessagePattern('FILTER:TYPE:UPDATE')
  update(@Payload() data: UpdateFilterTypeDto) {
    return this.filterTypeService.update(data);
  }

  @MessagePattern('FILTER:TYPE:DELETE')
  remove(@Payload() data: Validate) {
    return this.filterTypeService.remove(data.id);
  }
}
