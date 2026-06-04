import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ClientsModule } from '@nestjs/microservices';
import { ClientsModuleConfig } from '../common/config/client.config';
import { PaymentController } from './controllers/payment/payment.controller';
import { VerifyController } from './controllers/verify/verify.controller';
import { ValidationController } from './controllers/validation/validation.controller';
import { WalletController } from './controllers/wallets/wallet.controller';

@Module({
  imports: [ClientsModule.registerAsync(ClientsModuleConfig)],
  controllers: [
    PaymentController,
    VerifyController,
    ValidationController,
    WalletController,
  ],
  providers: [PaymentService],
})
export class PaymentModule {}
