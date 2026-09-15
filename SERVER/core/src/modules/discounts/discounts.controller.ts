import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DiscountsService } from './discounts.service';
import { DiscountDto } from './dto/discount.dto';

@Controller()
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @MessagePattern('DISCOUNT:CREATE')
  create(@Payload() createDiscountDto: DiscountDto) {
    return this.discountsService.create(createDiscountDto);
  }

  @MessagePattern('DISCOUNT:FIND')
  findAll() {
    return this.discountsService.findAll();
  }

  @MessagePattern('DISCOUNT:ONE')
  findOne(@Payload() id: number) {
    return this.discountsService.findOne(id);
  }

  @MessagePattern('DISCOUNT:REMOVE')
  remove(@Payload() id: number) {
    return this.discountsService.remove(id);
  }
}
