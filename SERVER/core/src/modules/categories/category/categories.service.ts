import { Injectable } from '@nestjs/common';
import { CategoryDto } from '../dto/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../common/message/message.status';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(data: CategoryDto) {
    try {
      const existing: Category | null = await this.categoryRepository.findOne({
        where: [{ title: data.title }, { link: data.link }],
      });

      if (!existing) return new CustomException(statusMessages.fa['409'], 409);

      const category: Category = this.categoryRepository.create({
        title: data.title,
        link: data.link,
        user: {
          id: data.user,
        },
      });
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
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
