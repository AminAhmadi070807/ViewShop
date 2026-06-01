import { Injectable } from '@nestjs/common';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoriesService {
  create(data: CategoryDto) {
    return 'This action adds a new category';
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: string) {
    return `This action returns a #${id} category`;
  }

  update(data: CategoryDto) {
    return data;
  }

  remove(id: string) {
    return `This action removes a #${id} category`;
  }
}
