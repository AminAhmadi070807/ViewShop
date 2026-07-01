import { Injectable } from '@nestjs/common';
import { WishlistDto } from './dto/wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { ProductService } from '../products/product/product.service';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    private readonly productService: ProductService,
  ) {}

  async create(data: WishlistDto) {
    try {
      const product = await this.productService.findOne(data.product);

      if (product instanceof RpcException) return product;

      const existing: Wishlist | null = await this.wishlistRepository.findOne({
        where: {
          user: {
            id: data.user,
          },
          product: {
            id: data.product,
          },
        },
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const wishlist: Wishlist = this.wishlistRepository.create({
        user: {
          id: data.user,
        },
        product: product.body,
        title: data.title,
      });

      await this.wishlistRepository.save(wishlist);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  findAll() {}

  findOne(id: string) {}

  update(data: WishlistDto) {}

  remove(id: string) {}
}
