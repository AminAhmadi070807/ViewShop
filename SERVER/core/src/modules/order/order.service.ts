import { HttpStatus, Injectable } from '@nestjs/common';
import { OrderDto, UpdateOrderDto } from './dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CartService } from '../cart/cart.service';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { RpcException } from '@nestjs/microservices';
import { OrderStatusEnum } from '../../common/enums/order/order.status.enum';
import { AddressesService } from '../addresses/addresses.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UsersService,
    private readonly cartService: CartService,
    private readonly addressService: AddressesService,
  ) {}

  async create(data: OrderDto) {
    try {
      const user = await this.userService.findOne(data.user);

      if (user.status !== HttpStatus.OK) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const cart = await this.cartService.findOne(data.user);

      if (cart instanceof RpcException) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const address = await this.addressService.findUserAddress({
        userId: data.user,
      });

      if (address instanceof RpcException) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const order: Order = this.orderRepository.create({
        status: OrderStatusEnum.PENDING,
        user: user.body,
        price: cart.body.price,
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
      const carts = await this.orderRepository.find({
        order: {
          createdAt: 'DESC',
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
      const cart: Order | null = await this.orderRepository.findOneBy({ id });

      if (!cart) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: cart,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async update(data: UpdateOrderDto) {
    try {
      await this.orderRepository.update(data.id, {
        status: data.status,
      });

      return {
        status: 204,
        message: statusMessages.fa['204'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
