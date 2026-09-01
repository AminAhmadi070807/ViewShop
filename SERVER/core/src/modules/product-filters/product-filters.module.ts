import { Module } from '@nestjs/common';
import { ProductFiltersService } from './product-filters.service';
import { ProductFiltersController } from './product-filters.controller';

@Module({
  controllers: [ProductFiltersController],
  providers: [ProductFiltersService],
})
export class ProductFiltersModule {}
