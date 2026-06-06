import { Injectable } from '@nestjs/common';
import { CategoryDto, UpdateCategoryDto } from '../dto/category.dto';
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
        where: [{ title: data.title }, { alias: data.alias }],
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const category: Category = this.categoryRepository.create({
        title: data.title,
        alias: data.alias,
        user: {
          id: data.user,
        },
        icon: {
          id: data.icon,
        },
      });

      const newCategory: Category =
        await this.categoryRepository.save(category);

      return {
        status: 201,
        body: newCategory,
        message: statusMessages.fa['201'],
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const categories: Category[] = await this.categoryRepository.find({
        order: {
          id: 'DESC',
        },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: categories,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const category: Category | null = await this.categoryRepository.findOneBy(
        {
          id,
        },
      );

      if (!category) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: category,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async update(data: UpdateCategoryDto) {
    try {
      await this.categoryRepository.update(
        { id: data.id },
        { alias: data.alias, title: data.title, icon: { id: data.icon } },
      );

      return {
        status: 204,
        body: null,
        message: statusMessages.fa['204'],
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      await this.categoryRepository.delete(id);

      return {
        status: 204,
        message: statusMessages.fa['204'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
