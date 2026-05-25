import { Module } from '@nestjs/common';
import { ParentProductsService } from './parent-products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentProduct } from './entities/parent-product.entity';

@Module({
  controllers: [],
  providers: [ParentProductsService],
  imports: [TypeOrmModule.forFeature([ParentProduct])],
})
export class ParentProductsModule {}
