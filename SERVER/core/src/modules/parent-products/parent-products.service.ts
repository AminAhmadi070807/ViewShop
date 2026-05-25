import { Injectable } from '@nestjs/common';
import { ParentProductDto } from './dto/parent-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ParentProduct } from './entities/parent-product.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class ParentProductsService {
  constructor(
    @InjectRepository(ParentProduct)
    private readonly productRepository: Repository<ParentProduct>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: ParentProductDto) {
    try {
      const user: User | null = await this.userRepository.findOneBy({
        id: data.userId,
      });

      if (!user) return new CustomException(statusMessages.fa['404'], 404);

      const aliasName: string = data.alias.replaceAll(' ', '-');

      const existingProductAlias: ParentProduct | null =
        await this.productRepository.findOneBy({
          alias: aliasName,
        });

      if (!existingProductAlias) {
        return new CustomException(statusMessages.fa['409'], 409);
      }

      const product: ParentProduct = this.productRepository.create({
        ...data,
        alias: aliasName,
        user: user,
      });

      await this.productRepository.save(product);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  findAll() {
    return `This action returns all parentProducts`;
  }

  findOne(id: string) {
    return `This action returns a #${id} parentProduct`;
  }

  update(id: string, data: ParentProductDto) {
    return `This action updates a #${id} parentProduct`;
  }

  remove(id: string) {
    return `This action removes a #${id} parentProduct`;
  }
}
