import { Injectable } from '@nestjs/common';
import { ProductDto } from '../dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../common/message/message.status';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(data: ProductDto) {}

  async findAll() {
    try {
      const products: Product[] = await this.productRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: products,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  findOne(id: string) {}

  update(data: ProductDto) {}
}
