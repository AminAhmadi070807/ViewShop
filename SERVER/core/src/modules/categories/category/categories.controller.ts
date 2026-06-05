import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CategoriesService } from './categories.service';
import { CategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { ValidateUUID } from '../../../common/validations/id.dto';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @MessagePattern('CATEGORY:CREATE')
  create(@Payload() data: CategoryDto) {
    return this.categoriesService.create(data);
  }

  @MessagePattern('CATEGORY:FIND')
  findAll() {
    return this.categoriesService.findAll();
  }

  @MessagePattern('CATEGORY:ONE')
  findOne(@Payload() data: ValidateUUID) {
    return this.categoriesService.findOne(data.id);
  }

  @MessagePattern('CATEGORY:UPDATE')
  update(@Payload() data: UpdateCategoryDto) {
    return this.categoriesService.update(data);
  }

  @MessagePattern('CATEGORY:DELETE')
  remove(@Payload() data: ValidateUUID) {
    return this.categoriesService.remove(data.id);
  }
}
