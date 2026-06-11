import { Module } from '@nestjs/common';
import { ParentProductsService } from './parent/parent.products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentProduct } from './entities/parent.product.entity';
import { User } from '../users/entities/user.entity';
import { ProductController } from './product/product.controller';
import { ParentProductController } from './parent/parent.product.controller';
import { ProductService } from './product/product.service';
import { Product } from './entities/product.entity';
import { Media } from '../media/entities/media.entity';

@Module({
  controllers: [ParentProductController, ProductController],
  providers: [ParentProductsService, ProductService],
  imports: [TypeOrmModule.forFeature([ParentProduct, User, Product, Media])],
})
export class ProductsModule {}
