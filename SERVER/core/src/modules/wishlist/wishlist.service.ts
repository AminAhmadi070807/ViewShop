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

  async findAll() {
    try {
      const wishlist: Wishlist[] = await this.wishlistRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: wishlist,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const result: Wishlist | null = await this.wishlistRepository.findOne({
        where: {
          id,
        },
        relations: [
          'product',
          'user',
          'product.parentProduct',
          'product.store',
        ],
        select: {
          product: {
            id: true,
            medias: true,
            price: true,
            discount_percent: true,
            alias: true,
            store: {
              id: true,
              title: true,
              alias: true,
            },
            parentProduct: {
              id: true,
              title: true,
            },
          },
          user: {
            id: true,
            fullName: true,
            phone: true,
          },
        },
      });

      if (!result) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: result,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  update(data: WishlistDto) {}

  remove(id: string) {}
}
