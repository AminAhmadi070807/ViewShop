import { Injectable } from '@nestjs/common';
import { SaleDto } from './dto/sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly SaleRepository: Repository<Sale>,
  ) {}

  sale(data: SaleDto) {}

  findAll() {}

  findStoreSale(id: string) {}
}
