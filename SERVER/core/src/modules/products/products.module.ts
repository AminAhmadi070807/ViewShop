import { Module } from '@nestjs/common';
import { ParentProductsService } from './parent.products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentProduct } from './entities/parent.product.entity';
import { User } from '../users/entities/user.entity';
import { ProductController } from './product.controller';
import { ParentProductController } from './parent.product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ParentProductController, ProductController],
  providers: [ParentProductsService, ProductService],
  imports: [TypeOrmModule.forFeature([ParentProduct, User])],
})
export class ProductsModule {}
