import { Injectable } from '@nestjs/common';
import { WishlistDto } from './dto/wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  create(data: WishlistDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: WishlistDto) {}

  remove(id: string) {}
}
