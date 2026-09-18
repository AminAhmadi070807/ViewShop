import { Injectable } from '@nestjs/common';
import { DiscountDto } from './dto/discount.dto';

@Injectable()
export class DiscountsService {
  create(data: DiscountDto) {}

  findAll() {}

  findOne(id: string) {}

  remove(id: string) {}
}
