import { Injectable } from '@nestjs/common';
import { BrandDto, UpdateBrandDto } from './dto/brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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

      const brand: Brand = this.brandRepository.create({
        title: data.title,
        description: data.description,
        alias: data.alias,
        link: data.link,
        logo: {
          id: data.logo,
        },
      });

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

  async findAll(page: number = 1) {
    try {
      const brands = await this.brandRepository.find({
        take: (page ?? 1) * 15,
        order: { createdAt: 'DESC' },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: brands,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const brand = await this.brandRepository.findOneBy({ id });

      if (!brand) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: brand,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async update(data: UpdateBrandDto) {
    try {
      const { logo, ...rest } = data;

      const brand: UpdateResult = await this.brandRepository.update(data.id, {
        ...rest,
        ...(logo && {
          logo: {
            id: data.logo,
          },
        }),
      });

      if (!brand.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return {
        status: 204,
        message: statusMessages.fa['200'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      const result: DeleteResult = await this.brandRepository.delete(id);

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return {
        status: 204,
        message: statusMessages.fa['204'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
