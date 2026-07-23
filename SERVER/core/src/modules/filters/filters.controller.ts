import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FiltersService } from './filters.service';
import { CreateFilterDto } from './dto/create-filter.dto';
import { UpdateFilterDto } from './dto/update-filter.dto';

@Controller()
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @MessagePattern('createFilter')
  create(@Payload() createFilterDto: CreateFilterDto) {
    return this.filtersService.create(createFilterDto);
  }

  @MessagePattern('findAllFilters')
  findAll() {
    return this.filtersService.findAll();
  }

  @MessagePattern('findOneFilter')
  findOne(@Payload() id: number) {
    return this.filtersService.findOne(id);
  }

  @MessagePattern('updateFilter')
  update(@Payload() updateFilterDto: UpdateFilterDto) {
    return this.filtersService.update(updateFilterDto.id, updateFilterDto);
  }

  @MessagePattern('removeFilter')
  remove(@Payload() id: number) {
    return this.filtersService.remove(id);
  }
}
