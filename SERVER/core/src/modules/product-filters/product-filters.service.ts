import { Injectable } from '@nestjs/common';
import { ProductFilterDto } from './dto/product-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductFilter } from './entities/product-filter.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class ProductFiltersService {
  constructor(
    @InjectRepository(ProductFilter)
    private readonly productRepository: Repository<ProductFilter>,
  ) {}

  async create(data: ProductFilterDto) {
    try {
      const result = this.productRepository.create({
        title: data.title,
        details: data.details.map((item) => {
          return {
            id: crypto.randomUUID(),
            title: item.title,
            value: item.value,
          };
        }),
      });

      await this.productRepository.save(result);

      return { status: 201, message: statusMessages.fa['201'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const result = await this.productRepository.find({
        order: { createdAt: 'DESC' },
      });

      return { status: 200, message: statusMessages.fa['200'], body: result };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  findOne(id: string) {}

  update(data: ProductFilterDto) {}

  remove(id: string) {}
}
