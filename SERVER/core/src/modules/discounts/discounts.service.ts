import { Injectable } from '@nestjs/common';
import { DiscountDto, UpdateDiscountDto } from './dto/discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
  ) {}

  async create(data: DiscountDto) {
    try {
      const existing = await this.discountRepository.findOneBy({
        code: data.code,
      });

      if (existing) {
        return new CustomException(statusMessages.fa['409'], 409);
      }

      const result = this.discountRepository.create(data);

      await this.discountRepository.save(result);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: { id: result.id },
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const result = await this.discountRepository.find({
        order: { createdAt: 'DESC' },
      });

      return { status: 200, messages: statusMessages.fa['200'], body: result };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.discountRepository.findOneBy({ id });

      if (!result) return new CustomException(statusMessages.fa['404'], 404);

      return { status: 200, message: statusMessages.fa['200'], body: result };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async update(data: UpdateDiscountDto) {
    try {
      const result = await this.discountRepository.update(data.id, data);

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return { status: 204, message: statusMessages.fa['204'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.discountRepository.delete(id);

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return { status: 204, message: statusMessages.fa['204'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
