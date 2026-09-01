import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductFiltersService } from './product-filters.service';
import { CreateProductFilterDto } from './dto/create-product-filter.dto';
import { UpdateProductFilterDto } from './dto/update-product-filter.dto';

@Controller()
export class ProductFiltersController {
  constructor(private readonly productFiltersService: ProductFiltersService) {}

  @MessagePattern('createProductFilter')
  create(@Payload() createProductFilterDto: CreateProductFilterDto) {
    return this.productFiltersService.create(createProductFilterDto);
  }

  @MessagePattern('findAllProductFilters')
  findAll() {
    return this.productFiltersService.findAll();
  }

  @MessagePattern('findOneProductFilter')
  findOne(@Payload() id: number) {
    return this.productFiltersService.findOne(id);
  }

  @MessagePattern('updateProductFilter')
  update(@Payload() updateProductFilterDto: UpdateProductFilterDto) {
    return this.productFiltersService.update(updateProductFilterDto.id, updateProductFilterDto);
  }

  @MessagePattern('removeProductFilter')
  remove(@Payload() id: number) {
    return this.productFiltersService.remove(id);
  }
}
