import { Injectable } from '@nestjs/common';
import { CategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { In, Repository } from 'typeorm';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../common/message/message.status';
import { FiltersService } from '../../filters/filters.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly filterService: FiltersService,
  ) {}

  async create(data: CategoryDto) {
    try {
      const existing: Category | null = await this.categoryRepository.findOne({
        where: [
          { title: data.title.trim() },
          { alias: data.alias.trim().toLowerCase() },
        ],
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const filters = await this.filterService.findById(data.filters);

      if (filters instanceof CustomException) return filters;

      const category = this.categoryRepository.create({
        title: data.title.trim(),
        alias: data.alias.trim().toLowerCase(),
        user: {
          id: data.user,
        },
        icon: {
          id: data.icon,
        },
        filters: filters.body,
      });

      const newCategory = await this.categoryRepository.save(category);

      return {
        status: 201,
        body: newCategory,
        message: statusMessages.fa['201'],
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll(page: number = 1) {
    try {
      const categories: Category[] = await this.categoryRepository.find({
        take: (page ?? 1) * 15,
        relations: ['user', 'filters', 'filters.filterTypes'],
        select: {
          icon: {
            id: true,
            title: true,
            path: true,
          },
          user: {
            id: true,
            fullName: true,
          },
          filters: {
            id: true,
            title: true,
            filterTypes: {
              id: true,
              title: true,
              public: true,
              type: true,
              details: true,
            },
          },
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

  async findId(id: string[]) {
    try {
      const categories: Category[] = await this.categoryRepository.find({
        where: {
          id: In(id),
        },
      });

      if (!categories.length) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

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
      const category = await this.categoryRepository.findOne({
        where: { id },
        relations: ['user', 'filter', 'filter.filterTypes'],
        select: {
          icon: {
            id: true,
            title: true,
            path: true,
          },
          user: {
            id: true,
            fullName: true,
          },
          filters: {
            id: true,
            title: true,
            filterTypes: {
              id: true,
              title: true,
              public: true,
            },
          },
        },
      });

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
      const filters = await this.filterService.findById(data.filters);

      if (filters instanceof CustomException) return filters;

      const result = await this.categoryRepository.update(data.id, {
        alias: data.alias,
        title: data.title,
        icon: { id: data.icon },
        filters: filters.body,
      });

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

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
      const result = await this.categoryRepository.delete(id);

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

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
