import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BrandsService } from './brands.service';
import { BrandDto, UpdateBrandDto } from './dto/brand.dto';
import { ValidateUUID } from '../../common/validations/id.dto';

@Controller()
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @MessagePattern('BRAND:CREATE')
  create(@Payload() data: BrandDto) {
    return this.brandsService.create(data);
  }

  @MessagePattern('BRAND:FIND')
  findAll() {
    return this.brandsService.findAll();
  }

  @MessagePattern('BRAND:ONE')
  findOne(@Payload() data: ValidateUUID) {
    return this.brandsService.findOne(data.id);
  }

  @MessagePattern('BRAND:UPDATE')
  update(@Payload() data: UpdateBrandDto) {
    return this.brandsService.update(data);
  }

  @MessagePattern('BRAND:DELETE')
  remove(@Payload() data: ValidateUUID) {
    return this.brandsService.remove(data.id);
  }
}
