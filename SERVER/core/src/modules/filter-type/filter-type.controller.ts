import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FilterTypeService } from './filter-type.service';
import { FilterTypeDto } from './dto/filter-type.dto';
import { Validate } from '../../common/validations/validate.dto';

@Controller()
export class FilterTypeController {
  constructor(private readonly filterTypeService: FilterTypeService) {}

  @MessagePattern('createFilterType')
  create(@Payload() data: FilterTypeDto) {
    return this.filterTypeService.create(data);
  }

  @MessagePattern('findAllFilterType')
  findAll() {
    return this.filterTypeService.findAll();
  }

  @MessagePattern('findOneFilterType')
  findOne(@Payload() data: Validate) {
    return this.filterTypeService.findOne(data.id);
  }

  @MessagePattern('updateFilterType')
  update(@Payload() data: FilterTypeDto) {
    return this.filterTypeService.update(data);
  }

  @MessagePattern('removeFilterType')
  remove(@Payload() data: Validate) {
    return this.filterTypeService.remove(data.id);
  }
}
