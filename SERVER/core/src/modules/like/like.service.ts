import { Injectable } from '@nestjs/common';
import { LikeDto } from './dto/like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ProductService } from '../products/product/product.service';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    private readonly userService: UsersService,
    private readonly productService: ProductService,
  ) {}

  create(data: LikeDto) {
    return 'This action adds a new like';
  }

  findAll() {
    return `This action returns all like`;
  }

  findOne(id: string) {
    return `This action returns a #${id} like`;
  }
}
