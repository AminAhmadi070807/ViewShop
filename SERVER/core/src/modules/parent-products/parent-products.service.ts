import { Injectable } from '@nestjs/common';
import { ParentProductDto } from './dto/create-parent-product.dto';

@Injectable()
export class ParentProductsService {
  create(data: ParentProductDto) {
    return 'This action adds a new parentProduct';
  }

  findAll() {
    return `This action returns all parentProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parentProduct`;
  }

  update(id: number, data: ParentProductDto) {
    return `This action updates a #${id} parentProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} parentProduct`;
  }
}
