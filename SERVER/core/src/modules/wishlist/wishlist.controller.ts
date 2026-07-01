import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WishlistService } from './wishlist.service';
import { WishlistDto } from './dto/wishlist.dto';

@Controller()
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @MessagePattern('WISHLIST:CREATE')
  create(@Payload() createWishlistDto: WishlistDto) {
    return this.wishlistService.create(createWishlistDto);
  }

  @MessagePattern('WISHLIST:FIND')
  findAll() {
    return this.wishlistService.findAll();
  }

  @MessagePattern('WISHLIST:ONE')
  findOne(@Payload() id: string) {
    return this.wishlistService.findOne(id);
  }

  @MessagePattern('WISHLIST:UPDATE')
  update(@Payload() data: WishlistDto) {
    return this.wishlistService.update(data);
  }

  @MessagePattern('WISHLIST:DELETE')
  remove(@Payload() id: string) {
    return this.wishlistService.remove(id);
  }
}
