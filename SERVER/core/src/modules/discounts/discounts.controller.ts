import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DiscountsService } from './discounts.service';
import { DiscountDto } from './dto/discount.dto';
import { Validate } from '../../common/validations/validate.dto';

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
  findOne(@Payload() data: Validate) {
    return this.discountsService.findOne(data.id);
  }

  @MessagePattern('DISCOUNT:UPDATE')
  update(@Payload() data: Validate) {
    return this.discountsService.findOne(data.id);
  }

  @MessagePattern('DISCOUNT:REMOVE')
  remove(@Payload() data: Validate) {
    return this.discountsService.remove(data.id);
  }
}
