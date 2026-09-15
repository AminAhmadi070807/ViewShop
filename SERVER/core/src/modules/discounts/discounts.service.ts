import { Injectable } from '@nestjs/common';
import { DiscountDto } from './dto/discount.dto';

@Injectable()
export class DiscountsService {
  create(data: DiscountDto) {
    return 'This action adds a new discount';
  }

  findAll() {
    return `This action returns all discounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} discount`;
  }

  remove(id: number) {
    return `This action removes a #${id} discount`;
  }
}
