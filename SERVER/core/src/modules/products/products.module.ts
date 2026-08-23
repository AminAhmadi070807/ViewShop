import { forwardRef, Module } from '@nestjs/common';
import { ParentProductsService } from './parent/parent.products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentProduct } from './entities/parent.product.entity';
import { User } from '../users/entities/user.entity';
import { ProductController } from './product.controller';
import { ParentProductController } from './parent/parent.product.controller';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { Media } from '../media/entities/media.entity';
import { CategoriesModule } from '../categories/categories.module';
import { MediaModule } from '../media/media.module';
import { StoreModule } from '../store/store.module';
import { ColorsModule } from '../colors/colors.module';
import { FiltersModule } from '../filters/filters.module';
import { CommentModule } from '../comment/comment.module';
import { BrandsModule } from '../brands/brands.module';

@Module({
  controllers: [ParentProductController, ProductController],
  providers: [ParentProductsService, ProductService],
  imports: [
    TypeOrmModule.forFeature([ParentProduct, User, Product, Media]),
    CategoriesModule,
    MediaModule,
    StoreModule,
    ColorsModule,
    FiltersModule,
    forwardRef(() => CommentModule),
    BrandsModule,
  ],
  exports: [ProductService, ParentProductsService],
})
export class ProductsModule {}
