import { Injectable } from '@nestjs/common';
import { SaleDto } from './dto/sale.dto';

@Injectable()
export class SalesService {
  sale(data: SaleDto) {
    return 'This action adds a new sale';
  }

  findAll() {
    return `This action returns all sales`;
  }

  findStoreSale(id: string) {
    return `This action returns a #${id} sale`;
  }
}
