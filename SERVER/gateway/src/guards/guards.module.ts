import { Module } from '@nestjs/common';
import { GuardsService } from './guards.service';
import { ClientsModule } from '@nestjs/microservices';
import { ClientsModuleConfig } from '../common/config/client.config';

@Module({
  imports: [ClientsModule.registerAsync(ClientsModuleConfig)],
  providers: [GuardsService],
})
export class GuardsModule {}
