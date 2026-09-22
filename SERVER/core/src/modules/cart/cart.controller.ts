import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CartService } from './cart.service';
import { CartDto } from './dto/cart.dto';
import { Validate } from '../../common/validations/validate.dto';
import { PageFilter } from '../../common/filters/page.filter';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @MessagePattern('CART:CREATE')
  create(@Payload() createCartDto: CartDto) {
    return this.cartService.create(createCartDto);
  }

  @MessagePattern('CART:FIND')
  findAll(@Payload() data: PageFilter) {
    return this.cartService.findAll(data.page);
  }

  @MessagePattern('CART:ONE')
  findOne(@Payload() data: Validate) {
    return this.cartService.findOne(data);
  }

  @MessagePattern('CART:EMPTY')
  empty(@Payload() data: Validate) {
    return this.cartService.empty(data);
  }
}
