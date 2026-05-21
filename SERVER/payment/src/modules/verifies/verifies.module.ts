import { Module } from '@nestjs/common';
import { VerifiesService } from './verifies.service';
import { VerifiesController } from './verifies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../payment/entities/payment.entity';

@Module({
  controllers: [VerifiesController],
  providers: [VerifiesService],
  imports: [TypeOrmModule.forFeature([Payment])],
})
export class VerifiesModule {}
