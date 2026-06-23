import { Injectable } from '@nestjs/common';
import { CartDto } from './dto/cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { ProductService } from '../products/product/product.service';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly productService: ProductService,
  ) {}

  async create(data: CartDto) {
    try {
      const existing: Cart | null = await this.cartRepository.findOneBy({
        id: data.id,
      });

      if (existing) {}

      const product = await this.productService.findOne(data.product);

      if (product instanceof RpcException) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const cart: Cart = this.cartRepository.create({
        id: data.id,
        metadata: [
          {
            product: data.product,
            quantity: data.quantity,
            price: Number(data.quantity) * Number(product.body.price),
          },
        ],
      });

      await this.cartRepository.save(cart);

      return {
        status: 200,
        body: null,
        message: statusMessages.fa['200'],
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  findAll() {}

  findOne(id: string) {}

  remove(id: string) {}
}
