import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CategoriesService } from './categories.service';
import { CategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { Validate } from '../../../common/validations/validate.dto';
import { PageFilter } from '../../../common/filters/page.filter';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @MessagePattern('CATEGORY:CREATE')
  create(@Payload() data: CategoryDto) {
    return this.categoriesService.create(data);
  }

  @MessagePattern('CATEGORY:FIND')
  findAll(@Payload() data: PageFilter) {
    return this.categoriesService.findAll(data.page);
  }

  @MessagePattern('CATEGORY:ONE')
  findOne(@Payload() data: Validate) {
    return this.categoriesService.findOne(data.id);
  }

  @MessagePattern('CATEGORY:UPDATE')
  update(@Payload() data: UpdateCategoryDto) {
    return this.categoriesService.update(data);
  }

  @MessagePattern('CATEGORY:DELETE')
  remove(@Payload() data: Validate) {
    return this.categoriesService.remove(data.id);
  }
}
