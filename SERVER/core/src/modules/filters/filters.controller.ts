import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FiltersService } from './filters.service';
import { FilterDto } from './dto/filter.dto';
import { Validate } from '../../common/validations/validate.dto';

@Controller()
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @MessagePattern('createFilter')
  create(@Payload() createFilterDto: FilterDto) {
    return this.filtersService.create(createFilterDto);
  }

  @MessagePattern('findAllFilters')
  findAll() {
    return this.filtersService.findAll();
  }

  @MessagePattern('findOneFilter')
  findOne(@Payload() data: Validate) {
    return this.filtersService.findOne(data.id);
  }

  @MessagePattern('updateFilter')
  update(@Payload() data: FilterDto) {
    return this.filtersService.update(data);
  }

  @MessagePattern('removeFilter')
  remove(@Payload() data: Validate) {
    return this.filtersService.remove(data.id);
  }
}
