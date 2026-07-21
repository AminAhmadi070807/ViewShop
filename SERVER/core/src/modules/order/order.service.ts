import { Injectable } from '@nestjs/common';
import { OrderDto, UpdateOrderDto } from './dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CartService } from '../cart/cart.service';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { RpcException } from '@nestjs/microservices';
import { OrderStatusEnum } from '../../common/enums/order/order.status.enum';
import { AddressesService } from '../addresses/addresses.service';
import { ProductService } from '../products/product/product.service';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UsersService,
    private readonly cartService: CartService,
    private readonly addressService: AddressesService,
    private readonly productService: ProductService,
    private readonly walletService: WalletService,
  ) {}

  async create(data: OrderDto) {
    try {
      const user = await this.userService.findOne({
        user: data.user,
        id: data.user,
      });
      const cart = await this.cartService.findOne(data.user);
      const address = await this.addressService.findOne(data.address);

      if (
        user instanceof RpcException ||
        cart instanceof RpcException ||
        address instanceof RpcException
      ) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const order: Order = this.orderRepository.create({
        status: OrderStatusEnum.WAITING,
        user: user.body,
        price: +cart.body.price,
        cart: cart.body.metadata,
        address: address.body,
      });

      await this.orderRepository.save(order);

      return {
        status: 201,
        body: null,
        message: statusMessages.fa['200'],
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const carts: Order[] = await this.orderRepository.find({
        order: {
          createdAt: 'DESC',
        },
        select: {
          status: true,
          user: {
            id: true,
            fullName: true,
            phone: true,
            role: true,
          },
          price: true,
          address: true,
          id: true,
        },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: carts,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.orderRepository.findOne({
        where: { id },
        select: {
          id: true,
          status: true,
          cart: true,
          price: true,
          address: true,
          user: {
            id: true,
            fullName: true,
            phone: true,
            role: true,
          },
        },
      });

      if (!result) return new CustomException(statusMessages.fa['404'], 404);

      const productId: string[] = result.cart.map((item) => item.product);

      const products = await this.productService.findById(productId);

      if (products instanceof RpcException) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const productArray: object[] = [];

      for (const product of products.body) {
        for (const item of result.cart) {
          if (item.product === product.id) {
            productArray.push({
              ...result,
              cart: {
                ...product,
                quantity: +item.quantity,
                totalPrice: item.price,
              },
            });
          }
        }
      }

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: productArray,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async update(data: UpdateOrderDto) {
    try {
      const result: UpdateResult = await this.orderRepository.update(data.id, {
        status: data.status,
      });

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return {
        status: 204,
        message: statusMessages.fa['204'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async payment(id: string) {
    try {
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['user'],
        select: {
          user: {
            id: true,
          },
        },
      });

      if (!order) return new CustomException(statusMessages.fa['404'], 404);

      const wallet = await this.walletService.payment({
        user: order.user.id,
        amount: +order.price,
      });

      if (wallet instanceof RpcException) return wallet;

      order.status = OrderStatusEnum.SUCCESS;

      await this.orderRepository.save(order);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
