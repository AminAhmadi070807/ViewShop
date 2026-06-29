import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller()
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @MessagePattern('createBrand')
  create(@Payload() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @MessagePattern('findAllBrands')
  findAll() {
    return this.brandsService.findAll();
  }

  @MessagePattern('findOneBrand')
  findOne(@Payload() id: number) {
    return this.brandsService.findOne(id);
  }

  @MessagePattern('updateBrand')
  update(@Payload() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(updateBrandDto.id, updateBrandDto);
  }

  @MessagePattern('removeBrand')
  remove(@Payload() id: number) {
    return this.brandsService.remove(id);
  }
}
