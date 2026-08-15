import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Controller()
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @MessagePattern('createSale')
  create(@Payload() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @MessagePattern('findAllSales')
  findAll() {
    return this.salesService.findAll();
  }

  @MessagePattern('findOneSale')
  findOne(@Payload() id: number) {
    return this.salesService.findOne(id);
  }

  @MessagePattern('updateSale')
  update(@Payload() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(updateSaleDto.id, updateSaleDto);
  }

  @MessagePattern('removeSale')
  remove(@Payload() id: number) {
    return this.salesService.remove(id);
  }
}
