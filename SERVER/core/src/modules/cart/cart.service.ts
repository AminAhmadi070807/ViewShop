import { Injectable } from '@nestjs/common';
import { CartDto } from './dto/cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

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
