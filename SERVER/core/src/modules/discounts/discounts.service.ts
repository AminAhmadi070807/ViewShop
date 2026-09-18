import { Injectable } from '@nestjs/common';
import { DiscountDto } from './dto/discount.dto';
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

  create(data: DiscountDto) {
    try {
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  findAll() {
    try {
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  findOne(id: string) {
    try {
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  update(data: DiscountDto) {
    try {
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  remove(id: string) {
    try {
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
