import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ParentProductsService } from './parent-products.service';
import { CreateParentProductDto } from './dto/create-parent-product.dto';
import { UpdateParentProductDto } from './dto/update-parent-product.dto';

@Controller()
export class ParentProductsController {
  constructor(private readonly parentProductsService: ParentProductsService) {}

  @MessagePattern('createParentProduct')
  create(@Payload() createParentProductDto: CreateParentProductDto) {
    return this.parentProductsService.create(createParentProductDto);
  }

  @MessagePattern('findAllParentProducts')
  findAll() {
    return this.parentProductsService.findAll();
  }

  @MessagePattern('findOneParentProduct')
  findOne(@Payload() id: number) {
    return this.parentProductsService.findOne(id);
  }

  @MessagePattern('updateParentProduct')
  update(@Payload() updateParentProductDto: UpdateParentProductDto) {
    return this.parentProductsService.update(updateParentProductDto.id, updateParentProductDto);
  }

  @MessagePattern('removeParentProduct')
  remove(@Payload() id: number) {
    return this.parentProductsService.remove(id);
  }
}
