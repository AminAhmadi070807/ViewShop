import { Injectable } from '@nestjs/common';
import { AttributeCategoryDto } from '../dto/attribute.category.dto';

@Injectable()
export class AttributeService {
  create(data: AttributeCategoryDto) {}
  findAll() {}
  findOne(id: string) {}
  update(data: null) {}
  delete(id: string) {}
}
