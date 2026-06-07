import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from '../entities/sub.category.entity';
import { Repository } from 'typeorm';
import { SubCategoryDto } from '../dto/sub.category.dto';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
  ) {}

  create(data: SubCategoryDto) {}

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: string) {
    return `This action returns a #${id} category`;
  }

  update(data: SubCategoryDto) {}

  remove(id: string) {}
}
