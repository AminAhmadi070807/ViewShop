import { Injectable } from '@nestjs/common';

@Injectable()
export class SubCategoryService {
  create() {
    return 'This action adds a new category';
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update() {}

  remove(id: number) {}
}
