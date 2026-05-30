import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @MessagePattern('CATEGORY:CREATE')
  create(@Payload() data: CreateCategoryDto) {
    return this.categoriesService.create(data);
  }

  @MessagePattern('CATEGORY:FIND')
  findAll() {
    return this.categoriesService.findAll();
  }

  @MessagePattern('CATEGORY:ONE')
  findOne(@Payload() id: string) {
    return this.categoriesService.findOne(id);
  }

  @MessagePattern('CATEGORY:UPDATE')
  update(@Payload() data: UpdateCategoryDto) {
    return this.categoriesService.update(data);
  }

  @MessagePattern('CATEGORY:DELETE')
  remove(@Payload() id: string) {
    return this.categoriesService.remove(id);
  }
}
