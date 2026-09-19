import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SalesService } from './sales.service';
import { SaleDto } from './dto/sale.dto';
import { Validate } from '../../common/validations/validate.dto';

@Controller()
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @MessagePattern('SALES:FIND:STORE')
  findStoreSale(@Payload() data: Validate) {
    return this.salesService.findStoreSale(data.id);
  }

  @MessagePattern('SALES:FIND:USER')
  findUserSale(@Payload() data: Validate) {
    return this.salesService.findUserSale(data.id);
  }

  @MessagePattern('SALES:SALE')
  sale(@Payload() data: SaleDto) {
    return this.salesService.sale(data);
  }

  @MessagePattern('SALES:FIND')
  findAll() {
    return this.salesService.findAll();
  }

  @MessagePattern('SALES:DELETE')
  remove(@Payload() data: Validate) {
    return this.salesService.remove(data.id);
  }
}
