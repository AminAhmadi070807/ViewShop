import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DiscountsService } from './discounts.service';
import { DiscountDto } from './dto/discount.dto';

@Controller()
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @MessagePattern('createDiscount')
  create(@Payload() createDiscountDto: DiscountDto) {
    return this.discountsService.create(createDiscountDto);
  }

  @MessagePattern('findAllDiscounts')
  findAll() {
    return this.discountsService.findAll();
  }

  @MessagePattern('findOneDiscount')
  findOne(@Payload() id: number) {
    return this.discountsService.findOne(id);
  }

  @MessagePattern('removeDiscount')
  remove(@Payload() id: number) {
    return this.discountsService.remove(id);
  }
}
