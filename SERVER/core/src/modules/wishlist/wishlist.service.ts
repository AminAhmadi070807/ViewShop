import { Injectable } from '@nestjs/common';
import { WishlistDto } from './dto/wishlist.dto';

@Injectable()
export class WishlistService {
  create(data: WishlistDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: WishlistDto) {}

  remove(id: string) {}
}
