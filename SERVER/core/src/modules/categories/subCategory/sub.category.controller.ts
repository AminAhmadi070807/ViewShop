import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SubCategoryService } from './sub.category.service';
import { SubCategoryDto, UpdateSubCategoryDto } from '../dto/sub.category.dto';

@Controller()
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @MessagePattern('CATEGORY:SUB:CREATE')
  create(@Payload() data: SubCategoryDto) {
    return this.subCategoryService.create(data);
  }

  @MessagePattern('CATEGORY:SUB:FIND')
  findAll() {
    return this.subCategoryService.findAll();
  }

  @MessagePattern('CATEGORY:SUB:ONE')
  findOne(@Payload() id: string) {
    return this.subCategoryService.findOne(id);
  }

  @MessagePattern('CATEGORY:SUB:UPDATE')
  update(@Payload() data: UpdateSubCategoryDto) {
    return this.subCategoryService.update(data);
  }

  @MessagePattern('CATEGORY:SUB:DELETE')
  remove(@Payload() id: string) {
    return this.subCategoryService.remove(id);
  }
}
