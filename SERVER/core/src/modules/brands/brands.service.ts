import { Injectable } from '@nestjs/common';
import { BrandDto } from './dto/brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async create(data: BrandDto) {
    try {
      const existing: Brand | null = await this.brandRepository.findOneBy([
        { alias: data.alias },
        { title: data.title },
      ]);

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const brand: Brand = this.brandRepository.create(data);

      await this.brandRepository.save(brand);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: brand,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  findAll() {}

  findOne(id: string) {}

  update(data: BrandDto) {}

  remove(id: string) {}
}
