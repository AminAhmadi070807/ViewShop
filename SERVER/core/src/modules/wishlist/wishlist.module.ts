import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [WishlistController],
  providers: [WishlistService],
  imports: [TypeOrmModule.forFeature([Wishlist]), ProductsModule],
})
export class WishlistModule {}
