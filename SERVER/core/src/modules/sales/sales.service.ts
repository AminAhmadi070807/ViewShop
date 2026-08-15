import { Injectable } from '@nestjs/common';
import { SaleDto } from './dto/sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { ProductService } from '../products/product/product.service';
import { StoreService } from '../store/store.service';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { OrderStatusBoxEnum } from '../../common/enums/order/order.status.enum';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    private readonly productService: ProductService,
    private readonly storeService: StoreService,
  ) {}

  async sale(data: SaleDto) {
    try {
      const product = await this.productService.findOne(data.product);

      if (product instanceof CustomException) return product;

      const store = await this.storeService.findOne({ id: data.store });

      if (store instanceof CustomException) return store;

      let isDetailInProduct: boolean = false;
      for (const detail of product.body.product.details) {
        if (detail.id === data.product_detail_id) {
          isDetailInProduct = true;
          break;
        }
      }

      if (!isDetailInProduct) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const sale = this.saleRepository.create({
        price: data.price,
        product: product.body.product,
        product_detail_id: data.product_detail_id,
        quantity: data.quantity,
        product_price: data.product_price,
        store: store.body,
        status: OrderStatusBoxEnum.PENDING,
      });

      await this.saleRepository.save(sale);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: null,
      };
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
