import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [TypeOrmModule.forFeature([Cart])],
})
export class CartModule {}
