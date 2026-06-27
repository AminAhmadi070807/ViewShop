import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern('ORDER:CREATE')
  create(@Payload() data: OrderDto) {
    return this.orderService.create(data);
  }

  @MessagePattern('ORDER:FIND')
  findAll() {
    return this.orderService.findAll();
  }

  @MessagePattern('ORDER:ONE')
  findOne(@Payload() id: number) {
    return this.orderService.findOne(id);
  }
}
