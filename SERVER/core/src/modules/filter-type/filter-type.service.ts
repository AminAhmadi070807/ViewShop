import { Injectable } from '@nestjs/common';
import { FilterTypeDto } from './dto/filter-type.dto';
import { UpdateFilterTypeDto } from './dto/update-filter-type.dto';

@Injectable()
export class FilterTypeService {
  create(createFilterTypeDto: FilterTypeDto) {
    return 'This action adds a new filterType';
  }

  findAll() {
    return `This action returns all filterType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} filterType`;
  }

  update(id: number, updateFilterTypeDto: UpdateFilterTypeDto) {
    return `This action updates a #${id} filterType`;
  }

  remove(id: number) {
    return `This action removes a #${id} filterType`;
  }
}
