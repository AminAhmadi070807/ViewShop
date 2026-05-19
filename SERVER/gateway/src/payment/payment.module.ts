import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ClientsModule } from '@nestjs/microservices';
import { ClientsModuleConfig } from '../common/config/client.config';

@Module({
  imports: [ClientsModule.registerAsync(ClientsModuleConfig)],
  controllers: [],
  providers: [PaymentService],
})
export class PaymentModule {}
