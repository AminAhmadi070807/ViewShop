import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WishlistService } from './wishlist.service';
import { WishlistDto } from './dto/wishlist.dto';

@Controller()
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @MessagePattern('createWishlist')
  create(@Payload() createWishlistDto: WishlistDto) {
    return this.wishlistService.create(createWishlistDto);
  }

  @MessagePattern('findAllWishlist')
  findAll() {
    return this.wishlistService.findAll();
  }

  @MessagePattern('findOneWishlist')
  findOne(@Payload() id: string) {
    return this.wishlistService.findOne(id);
  }

  @MessagePattern('updateWishlist')
  update(@Payload() data: WishlistDto) {
    return this.wishlistService.update(data);
  }

  @MessagePattern('removeWishlist')
  remove(@Payload() id: string) {
    return this.wishlistService.remove(id);
  }
}
