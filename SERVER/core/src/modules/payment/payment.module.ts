import { Module } from '@nestjs/common';
import { PaymentController } from './payment/payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { ZarinPalService } from './payment/services/zarin_pal/zarin_pal.service';
import { PaymentService } from './payment/payment.service';
import { WalletModule } from '../wallet/wallet.module';
import { PaymentSetting } from './entities/payment.setting.entity';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, ZarinPalService],
  imports: [TypeOrmModule.forFeature([Payment, PaymentSetting]), WalletModule],
  exports: [TypeOrmModule, PaymentService],
})
export class PaymentModule {}
