import { Module } from '@nestjs/common';
import { PaymentController } from './payment/payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { ZarinPalService } from './payment/services/zarin_pal/zarin_pal.service';
import { PaymentService } from './payment/payment.service';
import { WalletModule } from '../wallet/wallet.module';
import { PaymentSetting } from './entities/payment.setting.entity';
import { PaymentSettingService } from './setting/payment.setting.service';
import { PaymentSettingsController } from './setting/payment.setting.controller';

@Module({
  controllers: [PaymentController, PaymentSettingsController],
  providers: [PaymentService, ZarinPalService, PaymentSettingService],
  imports: [TypeOrmModule.forFeature([Payment, PaymentSetting]), WalletModule],
  exports: [TypeOrmModule, PaymentService],
})
export class PaymentModule {}
