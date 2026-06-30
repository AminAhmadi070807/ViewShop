import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';

@Controller()
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @MessagePattern('createBrand')
  create(@Payload() data: CreateBrandDto) {
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
  update(@Payload() data: CreateBrandDto) {
    return this.brandsService.update(data);
  }

  @MessagePattern('removeBrand')
  remove(@Payload() id: string) {
    return this.brandsService.remove(id);
  }
}
