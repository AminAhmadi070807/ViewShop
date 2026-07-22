import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SubCategoryService } from './sub.category.service';
import { SubCategoryDto, UpdateSubCategoryDto } from '../dto/sub.category.dto';
import { Validate } from '../../../common/validations/validate.dto';
import { PageFilter } from '../../../common/filters/page.filter';

@Controller()
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @MessagePattern('CATEGORY:SUB:CREATE')
  create(@Payload() data: SubCategoryDto) {
    return this.subCategoryService.create(data);
  }

  @MessagePattern('CATEGORY:SUB:FIND')
  findAll(@Payload() data: PageFilter) {
    return this.subCategoryService.findAll(data.page);
  }

  @MessagePattern('CATEGORY:SUB:ONE')
  findOne(@Payload() data: Validate) {
    return this.subCategoryService.findOne(data.id);
  }

  @MessagePattern('CATEGORY:SUB:UPDATE')
  update(@Payload() data: UpdateSubCategoryDto) {
    return this.subCategoryService.update(data);
  }

  @MessagePattern('CATEGORY:SUB:DELETE')
  remove(@Payload() data: Validate) {
    return this.subCategoryService.remove(data.id);
  }
}
