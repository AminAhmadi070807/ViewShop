import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { ZarinPalService } from './zarin_pal/zarin_pal.service';

@Module({
  controllers: [PaymentController],
  providers: [ZarinPalService],
  imports: [TypeOrmModule.forFeature([Payment])],
  exports: [TypeOrmModule, ZarinPalService],
})
export class PaymentModule {}
