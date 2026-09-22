import { Injectable } from '@nestjs/common';
import { CartDto } from './dto/cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { ProductService } from '../products/product.service';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { RpcException } from '@nestjs/microservices';
import { Validate } from '../../common/validations/validate.dto';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class CartService {
  product: Product;

  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly productService: ProductService,
  ) {}

  async getting(data: CartDto) {
    try {
      const existing = await this.cartRepository.findOneBy({
        user: { id: data.user },
      });

      if (!existing) return new CustomException(statusMessages.fa['404'], 404);

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
        body: { product: product.body.product, cart: existing, price },
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async create(data: CartDto) {
    try {
      const product = await this.productService.findOne(data.product);

      if (product instanceof RpcException) return product;

      this.product = product.body.product;

      const existing = await this.cartRepository.findOneBy({
        user: { id: data.user },
      });

      if (!existing) {
        const cart = this.cartRepository.create({
          user: { id: data.user },
          metadata: [],
          price: 0,
        });

        await this.cartRepository.save(cart);
      }

      return this.update(data);
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
            if (item.product_detail_id === data.product_detail_id) {
              for (const detail of this.product.details) {
                if (detail.stock < +data.quantity) {
                  return new CustomException(
                    'تعداد موجودی محصول کمتر میباشد',
                    404,
                  );
                }
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

      return { status: 200, message: statusMessages.fa['200'], body: null };
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
        user: { id: data.user },
      });

      if (!cart) return new CustomException(statusMessages.fa['404'], 404);

      return { status: 200, message: statusMessages.fa['200'], body: cart };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async empty(data: Validate) {
    try {
      const result = await this.cartRepository.findOne({
        where: { user: { id: data.user } },
      });

      if (!result) return new CustomException(statusMessages.fa['404'], 404);

      result.metadata = [];
      result.price = 0;

      await this.cartRepository.save(result);

      return { status: 204, message: statusMessages.fa['204'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(data: Validate) {
    try {
      const result = await this.cartRepository.findOne({
        where: { user: { id: data.user } },
      });

      if (!result) return new CustomException(statusMessages.fa['404'], 404);

      result.metadata = [];
      result.price = 0;

      await this.cartRepository.delete(result.id);

      return { status: 204, message: statusMessages.fa['204'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
