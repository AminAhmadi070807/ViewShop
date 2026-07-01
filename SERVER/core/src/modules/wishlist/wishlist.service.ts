import { Injectable } from '@nestjs/common';
import { WishlistDto } from './dto/wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { ProductService } from '../products/product/product.service';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    private readonly productService: ProductService,
  ) {}

  create(data: WishlistDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: WishlistDto) {}

  remove(id: string) {}
}
