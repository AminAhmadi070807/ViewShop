import { Module } from '@nestjs/common';
import { ParentProductsService } from './parent-products.service';
import { ParentProductsController } from './parent-products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentProduct } from './entities/parent-product.entity';

@Module({
  controllers: [ParentProductsController],
  providers: [ParentProductsService],
  imports: [TypeOrmModule.forFeature([ParentProduct])],
})
export class ParentProductsModule {}
