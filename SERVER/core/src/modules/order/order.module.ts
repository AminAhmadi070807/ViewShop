import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UsersModule } from '../users/users.module';
import { AddressesModule } from '../addresses/addresses.module';
import { CartModule } from '../cart/cart.module';
import { ProductsModule } from '../products/products.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    TypeOrmModule.forFeature([Order]),
    UsersModule,
    AddressesModule,
    CartModule,
    ProductsModule,
    WalletModule,
  ],
})
export class OrderModule {}
