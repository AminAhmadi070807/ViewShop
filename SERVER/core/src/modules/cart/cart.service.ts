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

  create(data: CartDto) {}

  findAll() {}

  findOne(id: string) {}

  remove(id: string) {}
}
