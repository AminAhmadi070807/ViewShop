import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CartService } from './cart.service';
import { CartDto } from './dto/cart.dto';
import { ValidateUUID } from '../../common/validations/id.dto';

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
  findOne(@Payload() data: ValidateUUID) {
    return this.cartService.findOne(data.id);
  }
}
