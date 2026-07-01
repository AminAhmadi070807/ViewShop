import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Controller()
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @MessagePattern('createWishlist')
  create(@Payload() createWishlistDto: CreateWishlistDto) {
    return this.wishlistService.create(createWishlistDto);
  }

  @MessagePattern('findAllWishlist')
  findAll() {
    return this.wishlistService.findAll();
  }

  @MessagePattern('findOneWishlist')
  findOne(@Payload() id: number) {
    return this.wishlistService.findOne(id);
  }

  @MessagePattern('updateWishlist')
  update(@Payload() updateWishlistDto: UpdateWishlistDto) {
    return this.wishlistService.update(updateWishlistDto.id, updateWishlistDto);
  }

  @MessagePattern('removeWishlist')
  remove(@Payload() id: number) {
    return this.wishlistService.remove(id);
  }
}
