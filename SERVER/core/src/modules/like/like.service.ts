import { Injectable } from '@nestjs/common';
import { LikeDto } from './dto/like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { ProductService } from '../products/product.service';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    private readonly productService: ProductService,
  ) {}

  async toggle(data: LikeDto) {
    try {
      const product = await this.productService.findOne(data.product);

      if (product instanceof RpcException) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const existing: Like | null = await this.likeRepository.findOneBy({
        user: { id: data.user },
        product: { id: data.product },
      });

      if (!existing) {
        const like: Like = this.likeRepository.create({
          user: { id: data.user },
          product: product.body.product,
        });

        await this.likeRepository.save(like);
      } else {
        await this.likeRepository.delete({
          user: { id: data.user },
          product: { id: data.product },
        });
      }

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const likes: Like[] = await this.likeRepository.find({
        relations: [
          'product',
          'user',
          'product.parentProduct',
          'product.medias',
          'product.store',
        ],
        order: {
          createdAt: 'DESC',
        },
        select: {
          product: {
            id: true,
            details: true,
            medias: {
              title: true,
              path: true,
            },
            parentProduct: {
              title: true,
            },
            status: true,
            store: {
              id: true,
              title: true,
              logo: true,
            },
          },
        },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: likes,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
