import { Injectable } from '@nestjs/common';
import { CartDto } from './dto/cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { ProductService } from '../products/product/product.service';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { RpcException } from '@nestjs/microservices';
import { Validate } from '../../common/validations/validate.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly productService: ProductService,
  ) {}

  async getting(data: CartDto) {
    try {
      const existing = (await this.cartRepository.findOneBy({
        id: data.id,
      })) as Cart;

      const product = await this.productService.findOne(data.product);

      if (product instanceof RpcException) return product;

      let price = 0;

      product.body.product.details.forEach((item) => {
        const isColor = item.color === data.color;

        if (isColor) {
          if (item.stock >= +data.quantity) {
            return (price = Number(data.quantity) * Number(item.price));
          }
        }
      });

      return {
        status: 200,
        message: statusMessages.fa['500'],
        body: {
          product: product.body.product,
          cart: existing,
          price,
        },
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async create(data: CartDto) {
    try {
      const existing = await this.cartRepository.findOneBy({ id: data.id });

      if (existing) return this.update(data);

      const result = await this.getting(data);

      if (result instanceof CustomException) return result;

      const cart = this.cartRepository.create({
        id: data.id,
        metadata: [
          {
            product: data.product,
            quantity: data.quantity,
            product_detail_id: data.product_detail_id,
            price: result.body.price,
          },
        ],
        price: result.body.price,
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

  async update(data: CartDto) {
    try {
      const result = await this.getting(data);

      if (result instanceof CustomException) return result;

      const existProduct: boolean = result.body.cart.metadata.some(
        (metaData) => metaData.product === data.product,
      );

      let totalPrice: number = 0;
      for (const metaData of result.body.cart.metadata) {
        const product = await this.productService.findOne(metaData.product);

        if (product instanceof RpcException) return product;

        let price = 0;

        product.body.product.details.forEach((item) => {
          if (item.color === data.color) {
            if (item.stock < +data.quantity) {
              return new CustomException('تعداد انتخابی نامعتبر است', 409);
            }

            price = Number(data.quantity) * Number(item.price);
          }
        });

        totalPrice = totalPrice + Number(price);
      }

      if (existProduct) {
        for (const item of result.body.cart.metadata) {
          if (item.product === data.product) {
            const product = await this.productService.findOne(item.product);

            if (product instanceof RpcException) return product;

            if (item.product_detail_id === data.product_detail_id) {
              if (item.quantity < +data.quantity) {
                return new CustomException('تعداد انتخابی نامعتبر است', 409);
              }

              item.quantity = data.quantity;
              item.price = result.body.price;
            }
          }
        }
      } else {
        result.body.cart.metadata.push({
          quantity: data.quantity,
          product_detail_id: data.product_detail_id,
          product: data.product,
          price: result.body.price,
        });
      }

      result.body.cart.price = totalPrice;

      await this.cartRepository.save(result.body.cart);
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll(page: number = 1) {
    try {
      const carts: Cart[] = await this.cartRepository.find({
        take: (page ?? 1) * 15,
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

  async findOne(data: Validate) {
    try {
      const cart = await this.cartRepository.findOneBy({
        id: data.id,
        user: { id: data.user },
      });

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
