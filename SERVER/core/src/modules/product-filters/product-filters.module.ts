import { Module } from '@nestjs/common';
import { ProductFiltersService } from './product-filters.service';
import { ProductFiltersController } from './product-filters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductFilter } from './entities/product-filter.entity';

@Module({
  controllers: [ProductFiltersController],
  providers: [ProductFiltersService],
  imports: [TypeOrmModule.forFeature([ProductFilter])],
})
export class ProductFiltersModule {}
