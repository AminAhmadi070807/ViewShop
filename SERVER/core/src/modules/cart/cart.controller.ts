import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @MessagePattern('createCart')
  create(@Payload() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @MessagePattern('findAllCart')
  findAll() {
    return this.cartService.findAll();
  }

  @MessagePattern('findOneCart')
  findOne(@Payload() id: number) {
    return this.cartService.findOne(id);
  }

  @MessagePattern('updateCart')
  update(@Payload() updateCartDto: UpdateCartDto) {
    return this.cartService.update(updateCartDto.id, updateCartDto);
  }

  @MessagePattern('removeCart')
  remove(@Payload() id: number) {
    return this.cartService.remove(id);
  }
}
