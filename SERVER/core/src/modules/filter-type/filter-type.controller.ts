import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FilterTypeService } from './filter-type.service';
import { CreateFilterTypeDto } from './dto/create-filter-type.dto';
import { UpdateFilterTypeDto } from './dto/update-filter-type.dto';

@Controller()
export class FilterTypeController {
  constructor(private readonly filterTypeService: FilterTypeService) {}

  @MessagePattern('createFilterType')
  create(@Payload() createFilterTypeDto: CreateFilterTypeDto) {
    return this.filterTypeService.create(createFilterTypeDto);
  }

  @MessagePattern('findAllFilterType')
  findAll() {
    return this.filterTypeService.findAll();
  }

  @MessagePattern('findOneFilterType')
  findOne(@Payload() id: number) {
    return this.filterTypeService.findOne(id);
  }

  @MessagePattern('updateFilterType')
  update(@Payload() updateFilterTypeDto: UpdateFilterTypeDto) {
    return this.filterTypeService.update(updateFilterTypeDto.id, updateFilterTypeDto);
  }

  @MessagePattern('removeFilterType')
  remove(@Payload() id: number) {
    return this.filterTypeService.remove(id);
  }
}
