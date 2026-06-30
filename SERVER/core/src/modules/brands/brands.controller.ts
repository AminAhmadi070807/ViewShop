import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BrandsService } from './brands.service';
import { BrandDto, UpdateBrandDto } from './dto/brand.dto';

@Controller()
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @MessagePattern('createBrand')
  create(@Payload() data: BrandDto) {
    return this.brandsService.create(data);
  }

  @MessagePattern('findAllBrands')
  findAll() {
    return this.brandsService.findAll();
  }

  @MessagePattern('findOneBrand')
  findOne(@Payload() id: string) {
    return this.brandsService.findOne(id);
  }

  @MessagePattern('updateBrand')
  update(@Payload() data: UpdateBrandDto) {
    return this.brandsService.update(data);
  }

  @MessagePattern('removeBrand')
  remove(@Payload() id: string) {
    return this.brandsService.remove(id);
  }
}
