import { Injectable } from '@nestjs/common';
import { SaleDto } from './dto/sale.dto';

@Injectable()
export class SalesService {
  sale(data: SaleDto) {}

  findAll() {}

  findStoreSale(id: string) {}
}
