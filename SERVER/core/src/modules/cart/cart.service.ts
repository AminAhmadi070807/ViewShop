import { Injectable } from '@nestjs/common';
import { CartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  create(data: CartDto) {
    return 'This action adds a new cart';
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
