import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';
import { WalletModule } from '../wallet/wallet.module';
import { PaymentSetting } from './entities/payment.setting.entity';
import { PaymentSettingService } from './setting/payment.setting.service';
import { PaymentSettingsController } from './setting/payment.setting.controller';
import { ZarinPalService } from './services/zarin-pal/zarin-pal.service';
import { ZarinPalController } from './services/zarin-pal/zarin-pal.controller';

@Module({
  controllers: [
    PaymentController,
    PaymentSettingsController,
    ZarinPalController,
  ],
  providers: [PaymentService, PaymentSettingService, ZarinPalService],
  imports: [TypeOrmModule.forFeature([Payment, PaymentSetting]), WalletModule],
  exports: [TypeOrmModule, PaymentService],
})
export class PaymentModule {}
