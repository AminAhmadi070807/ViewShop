import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BrandsService } from './brands.service';
import { BrandDto, UpdateBrandDto } from './dto/brand.dto';
import { Validate } from '../../common/validations/validate.dto';
import { PageFilter } from '../../common/filters/page.filter';

@Controller()
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @MessagePattern('BRAND:CREATE')
  create(@Payload() data: BrandDto) {
    return this.brandsService.create(data);
  }

  @MessagePattern('BRAND:FIND')
  findAll(@Payload() data: PageFilter) {
    return this.brandsService.findAll(data?.page);
  }

  @MessagePattern('BRAND:ONE')
  findOne(@Payload() data: Validate) {
    return this.brandsService.findOne(data.id);
  }

  @MessagePattern('BRAND:UPDATE')
  update(@Payload() data: UpdateBrandDto) {
    return this.brandsService.update(data);
  }

  @MessagePattern('BRAND:DELETE')
  remove(@Payload() data: Validate) {
    return this.brandsService.remove(data.id);
  }
}
