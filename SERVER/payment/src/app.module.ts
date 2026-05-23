import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleConfig } from './common/config/typeorm.config';
import { PaymentModule } from './modules/payment/payment.module';
import { VerifiesModule } from './modules/verifies/verifies.module';
import { ValidationsModule } from './modules/validations/validations.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(TypeOrmModuleConfig),
    PaymentModule,
    VerifiesModule,
    ValidationsModule,
    WalletModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
