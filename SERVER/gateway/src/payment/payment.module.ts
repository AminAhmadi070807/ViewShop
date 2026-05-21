import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ClientsModule } from '@nestjs/microservices';
import { ClientsModuleConfig } from '../common/config/client.config';
import { PaymentController } from './controllers/payment/payment.controller';

@Module({
  imports: [ClientsModule.registerAsync(ClientsModuleConfig)],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
