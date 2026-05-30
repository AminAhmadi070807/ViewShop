import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SubCategoryService } from './sub.category.service';

@Controller()
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @MessagePattern('CATEGORY:CREATE')
  create() {
    return this.subCategoryService.create();
  }

  @MessagePattern('CATEGORY:FIND')
  findAll() {
    return this.subCategoryService.findAll();
  }

  @MessagePattern('CATEGORY:ONE')
  findOne(@Payload() id: number) {
    return this.subCategoryService.findOne(id);
  }

  @MessagePattern('CATEGORY:UPDATE')
  update() {
    return this.subCategoryService.update();
  }

  @MessagePattern('CATEGORY:DELETE')
  remove(@Payload() id: number) {
    return this.subCategoryService.remove(id);
  }
}
