import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { ProductController } from './product.controller';
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
import { SpecificationModule } from '../specification/specification.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    TypeOrmModule.forFeature([User, Product, Media]),
    CategoriesModule,
    MediaModule,
    StoreModule,
    ColorsModule,
    FiltersModule,
    forwardRef(() => CommentModule),
    BrandsModule,
    SpecificationModule,
  ],
  exports: [ProductService],
})
export class ProductsModule {}
