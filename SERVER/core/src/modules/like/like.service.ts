import { Injectable } from '@nestjs/common';
import { LikeDto } from './dto/like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ProductService } from '../products/product/product.service';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    private readonly userService: UsersService,
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
        products: { id: data.product },
      });

      if (!existing) {
        const like: Like = this.likeRepository.create({
          user: { id: data.user },
          products: product.body,
        });

        await this.likeRepository.save(like);
      } else {
        await this.likeRepository.delete({
          user: { id: data.user },
          products: { id: data.product },
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

  findAll() {
    return `This action returns all like`;
  }

  findUser(id: string) {
    return `This action returns a #${id} like`;
  }
}
