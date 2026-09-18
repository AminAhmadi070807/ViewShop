import { Injectable } from '@nestjs/common';
import { DiscountDto } from './dto/discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
  ) {}

  create(data: DiscountDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: DiscountDto) {}

  remove(id: string) {}
}
