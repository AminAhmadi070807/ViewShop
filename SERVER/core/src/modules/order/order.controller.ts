import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { OrderDto, UpdateOrderDto } from './dto/order.dto';
import { Validate } from '../../common/validations/validate.dto';
import { PageFilter } from '../../common/filters/page.filter';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern('ORDER:CREATE')
  create(@Payload() data: OrderDto) {
    return this.orderService.create(data);
  }

  @MessagePattern('ORDER:FIND')
  findAll(@Payload() data: PageFilter) {
    return this.orderService.findAll(data.page);
  }

  @MessagePattern('ORDER:ONE')
  findOne(@Payload() data: Validate) {
    return this.orderService.findOne(data);
  }

  @MessagePattern('ORDER:UPDATE')
  update(@Payload() data: UpdateOrderDto) {
    return this.orderService.update(data);
  }

  @MessagePattern('ORDER:PAYMENT')
  payment(@Payload() data: Validate) {
    return this.orderService.payment(data);
  }

  @MessagePattern('ORDER:PAYMENT')
  remove(@Payload() data: Validate) {
    return this.orderService.remove(data.id);
  }
}
