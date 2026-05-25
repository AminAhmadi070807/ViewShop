import { Injectable } from '@nestjs/common';
import { CreateParentProductDto } from './dto/create-parent-product.dto';
import { UpdateParentProductDto } from './dto/update-parent-product.dto';

@Injectable()
export class ParentProductsService {
  create(createParentProductDto: CreateParentProductDto) {
    return 'This action adds a new parentProduct';
  }

  findAll() {
    return `This action returns all parentProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parentProduct`;
  }

  update(id: number, updateParentProductDto: UpdateParentProductDto) {
    return `This action updates a #${id} parentProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} parentProduct`;
  }
}
