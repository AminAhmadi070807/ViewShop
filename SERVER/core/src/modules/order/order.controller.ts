import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { OrderDto, UpdateOrderDto } from './dto/order.dto';
import { ValidateUUID } from '../../common/validations/id.dto';

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
  findOne(@Payload() data: ValidateUUID) {
    return this.orderService.findOne(data.id);
  }

  @MessagePattern('ORDER:UPDATE')
  update(@Payload() data: UpdateOrderDto) {
    return this.orderService.update(data);
  }
}
