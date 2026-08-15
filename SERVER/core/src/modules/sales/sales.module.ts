import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { ProductsModule } from '../products/products.module';
import { StoreModule } from '../store/store.module';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
  imports: [TypeOrmModule.forFeature([Sale]), ProductsModule, StoreModule],
  exports: [SalesService],
})
export class SalesModule {}
