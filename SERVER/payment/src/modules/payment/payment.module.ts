import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [TypeOrmModule.forFeature([Payment])],
  exports: [TypeOrmModule],
})
export class PaymentModule {}
