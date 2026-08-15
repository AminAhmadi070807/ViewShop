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
import {
  OrderStatusBoxEnum,
  OrderStatusEnum,
} from '../../common/enums/order/order.status.enum';
import { AddressesService } from '../addresses/addresses.service';
import { ProductService } from '../products/product/product.service';
import { WalletService } from '../wallet/wallet.service';
import { Validate } from '../../common/validations/validate.dto';
import { SalesService } from '../sales/sales.service';

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
    private readonly salesService: SalesService,
  ) {}

  async create(data: OrderDto) {
    try {
      const user = await this.userService.findOne({
        user: data.user,
        id: data.user,
      });
      const cart = await this.cartService.findOne({
        id: data.user,
        user: data.user,
      });
      const address = await this.addressService.findOne({
        id: data.address,
        user: data.user,
      });

      if (user instanceof CustomException) return user;
      if (cart instanceof CustomException) return cart;
      if (address instanceof CustomException) return address;

      const productIds = cart.body.metadata.map((item) => item.product);

      const products = await this.productService.findById(productIds);

      if (products instanceof CustomException) return products;

      const order = this.orderRepository.create({
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

  async findAll(page: number = 1) {
    try {
      const carts: Order[] = await this.orderRepository.find({
        take: (page ?? 1) * 10,
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

  async findOne(data: Validate) {
    try {
      const result = await this.orderRepository.findOne({
        where: { id: data.id, user: { id: data.user } },
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

  async payment(data: Validate) {
    try {
      const order = await this.orderRepository.findOne({
        where: { id: data.id },
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

      let minusPrice = 0;
      for (const item of order.cart) {
        const result = await this.productService.updateStock({
          id: item.product,
          product_detail_id: item.product_detail_id,
          stock: item.quantity,
        });

        if (result instanceof CustomException) {
          minusPrice = minusPrice + +item.price;
          item.status = OrderStatusEnum.FAILED;
          await this.walletService.charge({
            user: order.user.id,
            amount: item.price,
          });
        }
      }

      order.price = +order.price - minusPrice;
      order.status = OrderStatusEnum.SUCCESS;
      order.status_box = OrderStatusBoxEnum.PENDING;

      for (const item of order.cart) {
        if (item.status === OrderStatusEnum.SUCCESS) {
          await this.salesService.sale({
            product: item.product,
            product_detail_id: item.product_detail_id,
            price: item.price,
            product_price: item.price / item.quantity,
            quantity: item.quantity,
          });
        }
      }

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
