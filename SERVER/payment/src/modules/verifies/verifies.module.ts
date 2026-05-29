import { Module } from '@nestjs/common';
import { VerifiesService } from './verifies.service';
import { VerifiesController } from './verifies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../payment/entities/payment.entity';
import { Validation } from '../validations/entities/validation.entity';
import { Wallet } from '../wallet/entities/wallet.entity';

@Module({
  controllers: [VerifiesController],
  providers: [VerifiesService],
  imports: [TypeOrmModule.forFeature([Payment, Validation, Wallet])],
  exports: [VerifiesService],
})
export class VerifiesModule {}
