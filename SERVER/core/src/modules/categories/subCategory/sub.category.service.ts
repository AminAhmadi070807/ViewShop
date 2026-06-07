import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from '../entities/sub.category.entity';
import { Repository } from 'typeorm';
import { SubCategoryDto } from '../dto/sub.category.dto';
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
        icon: data.icon,
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

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: string) {
    return `This action returns a #${id} category`;
  }

  update(data: SubCategoryDto) {}

  remove(id: string) {}
}
