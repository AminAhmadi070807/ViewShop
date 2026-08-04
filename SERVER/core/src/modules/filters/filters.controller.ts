import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FiltersService } from './filters.service';
import { FilterDto, UpdateFilterDto } from './dto/filter.dto';
import { Validate } from '../../common/validations/validate.dto';

@Controller()
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @MessagePattern('FILTER:CREATE')
  create(@Payload() data: FilterDto) {
    return this.filtersService.create(data);
  }

  @MessagePattern('FILTER:FIND')
  findAll() {
    return this.filtersService.findAll();
  }

  @MessagePattern('FILTER:ONE')
  findOne(@Payload() data: Validate) {
    return this.filtersService.findOne(data.id);
  }

  @MessagePattern('FILTER:UPDATE')
  update(@Payload() data: UpdateFilterDto) {
    return this.filtersService.update(data);
  }

  @MessagePattern('FILTER:TOGGLE:TYPE')
  filterToggleType(@Payload() data: UpdateFilterDto) {
    return this.filtersService.filterToggleType(data);
  }

  @MessagePattern('FILTER:DELETE')
  remove(@Payload() data: Validate) {
    return this.filtersService.remove(data.id);
  }
}
