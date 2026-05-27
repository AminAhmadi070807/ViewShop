import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentProduct } from './entities/parent.product.entity';
import { User } from '../users/entities/user.entity';

@Module({
  controllers: [],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([ParentProduct, User])],
})
export class ProductsModule {}
