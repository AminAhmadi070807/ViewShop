import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CartService } from './cart.service';
import { CartDto } from './dto/cart.dto';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @MessagePattern('CART:CREATE')
  create(@Payload() createCartDto: CartDto) {
    return this.cartService.create(createCartDto);
  }

  @MessagePattern('CART:FIND')
  findAll() {
    return this.cartService.findAll();
  }

  @MessagePattern('CART:ONE')
  findOne(@Payload() id: number) {
    return this.cartService.findOne(id);
  }

  @MessagePattern('CART:DELETE')
  remove(@Payload() id: number) {
    return this.cartService.remove(id);
  }
}
