import { Injectable } from '@nestjs/common';
import { FilterTypeDto } from './dto/filter-type.dto';

@Injectable()
export class FilterTypeService {
  create(data: FilterTypeDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: FilterTypeDto) {}

  remove(id: string) {}
}
