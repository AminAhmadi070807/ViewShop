import { Module } from '@nestjs/common';
import { CategoriesService } from './category/categories.service';
import { CategoriesController } from './category/categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { SubCategory } from './entities/sub.category.entity';
import { Attribute } from './entities/attribute.entity';
import { SubCategoryController } from './subCategory/sub.category.controller';
import { AttributeController } from './attribute/attribute.controller';
import { SubCategoryService } from './subCategory/sub.category.service';
import { AttributeService } from './attribute/attribute.service';

@Module({
  controllers: [
    CategoriesController,
    SubCategoryController,
    AttributeController,
  ],
  providers: [CategoriesService, SubCategoryService, AttributeService],
  imports: [TypeOrmModule.forFeature([Category, SubCategory, Attribute])],
})
export class CategoriesModule {}
