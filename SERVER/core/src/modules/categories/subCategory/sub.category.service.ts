import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from '../entities/sub.category.entity';
import { Repository } from 'typeorm';
import { SubCategoryDto, UpdateSubCategoryDto } from '../dto/sub.category.dto';
import { statusMessages } from '../../../common/message/message.status';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { Category } from '../entities/category.entity';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(data: SubCategoryDto) {
    try {
      // existing sub category in database
      const existing: SubCategory | null =
        await this.subCategoryRepository.findOneBy([
          { title: data.title, category: { id: data.category } },
          { alias: data.alias, category: { id: data.category } },
        ]);
      // find category from database
      const category: Category | null = await this.categoryRepository.findOneBy(
        { id: data.category },
      );

      // check subCategory & category
      if (existing || !category) {
        return new CustomException(statusMessages.fa['409'], 409);
      }

      const subCategory: SubCategory = this.subCategoryRepository.create({
        category,
        alias: data.alias,
        title: data.title,
        icon: {
          id: data.icon,
        },
        user: {
          id: data.user,
        },
      });

      const newSubCategory: SubCategory =
        await this.subCategoryRepository.save(subCategory);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: {
          id: newSubCategory.id,
        },
      };
    } catch {
      throw new BadRequestException(statusMessages.fa['500']);
    }
  }

  async findAll() {
    try {
      const subCategories: SubCategory[] =
        await this.subCategoryRepository.find({
          order: {
            id: 'DESC',
          },
          relations: ['category', 'category:icon', 'user'],
          select: {
            category: {
              id: true,
              alias: true,
              title: true,
              icon: true,
            },
            user: {
              fullName: true,
              id: true,
            },
          },
        });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: subCategories,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const subCategory: SubCategory | null =
        await this.subCategoryRepository.findOne({
          where: {
            id: id,
          },
          order: {
            id: 'DESC',
          },
          relations: ['category', 'category:icon', 'user'],
          select: {
            category: {
              id: true,
              alias: true,
              title: true,
              icon: true,
            },
            user: {
              fullName: true,
              id: true,
            },
          },
        });

      if (!subCategory) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: subCategory,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async update(data: UpdateSubCategoryDto) {
    try {
      await this.subCategoryRepository.update(
        { id: data.id },
        {
          alias: data.alias,
          title: data.title,
          icon: { id: data.icon },
          category: { id: data.category },
        },
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

  remove(id: string) {}
}
