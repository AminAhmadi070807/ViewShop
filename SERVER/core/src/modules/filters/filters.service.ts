import { Injectable } from '@nestjs/common';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class FiltersService {
  create(data: FilterDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: FilterDto) {}

  remove(id: string) {}
}
