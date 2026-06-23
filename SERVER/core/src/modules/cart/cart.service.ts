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

      const product = await this.productService.findOne(data.product);

      if (product instanceof RpcException) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const price = Number(data.quantity) * Number(product.body.price);

      if (existing) {
        const existProduct: boolean = existing.metadata.some(
          (metaData) => metaData.product === data.product,
        );

        let totalPrice: number = 0;
        for (const metaData of existing.metadata) {
          const product = await this.productService.findOne(metaData.product);

          if (product instanceof RpcException) {
            return new CustomException(statusMessages.fa['404'], 404);
          }

          const price = Number(metaData.quantity) * Number(product.body.price);

          totalPrice = totalPrice + Number(price);
        }

        if (existProduct) {
          existing.metadata.forEach((metaData) => {
            if (metaData.product === data.product) {
              metaData.quantity = data.quantity;
              metaData.price = price;
            }
          });
        } else {
          existing.metadata.push({
            quantity: data.quantity,
            product: data.product,
            price,
          });
        }

        existing.price = totalPrice;

        await this.cartRepository.save(existing);
      }

      const cart: Cart = this.cartRepository.create({
        id: data.id,
        metadata: [
          {
            product: data.product,
            quantity: data.quantity,
            price,
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

  async findAll() {
    try {
      const carts: Cart[] = await this.cartRepository.find({
        order: {
          updatedAt: 'DESC',
        },
      });

      return {
        status: 200,
        body: carts,
        message: statusMessages.fa['200'],
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const cart: Cart | null = await this.cartRepository.findOneBy({ id });

      if (!cart) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: 200,
        body: cart,
        message: statusMessages.fa['200'],
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
