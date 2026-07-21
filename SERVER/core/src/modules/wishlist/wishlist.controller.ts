import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WishlistService } from './wishlist.service';
import { UpdateWishlistDto, WishlistDto } from './dto/wishlist.dto';
import { Validate } from '../../common/validations/validate.dto';

@Controller()
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @MessagePattern('WISHLIST:CREATE')
  create(@Payload() data: WishlistDto) {
    return this.wishlistService.create(data);
  }

  @MessagePattern('WISHLIST:FIND')
  findAll() {
    return this.wishlistService.findAll();
  }

  @MessagePattern('WISHLIST:ONE')
  findOne(@Payload() data: Validate) {
    return this.wishlistService.findOne(data.id);
  }

  @MessagePattern('WISHLIST:UPDATE')
  update(@Payload() data: UpdateWishlistDto) {
    return this.wishlistService.update(data);
  }

  @MessagePattern('WISHLIST:DELETE')
  remove(@Payload() data: Validate) {
    return this.wishlistService.remove(data.id);
  }
}
