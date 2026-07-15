import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { ZarinPalService } from './services/zarin_pal/zarin_pal.service';
import { PaymentService } from './payment.service';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, ZarinPalService],
  imports: [TypeOrmModule.forFeature([Payment]), WalletModule],
  exports: [TypeOrmModule, PaymentService],
})
export class PaymentModule {}
