import { Injectable } from '@nestjs/common';
import { SaleDto } from './dto/sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { ProductService } from '../products/product/product.service';
import { StoreService } from '../store/store.service';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly SaleRepository: Repository<Sale>,
    private readonly productService: ProductService,
    private readonly storeService: StoreService,
  ) {}

  sale(data: SaleDto) {
    try {
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  findAll() {
    try {
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  findStoreSale(id: string) {
    try {
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
