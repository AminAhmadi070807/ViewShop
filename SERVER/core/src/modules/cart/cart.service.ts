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

  findOne(id: string) {
    return `This action returns a #${id} cart`;
  }

  remove(id: string) {
    return `This action removes a #${id} cart`;
  }
}
