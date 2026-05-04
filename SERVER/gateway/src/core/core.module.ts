import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { ClientsModuleConfig } from '../common/config/client.config';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  providers: [CoreService],
  imports: [ClientsModule.registerAsync(ClientsModuleConfig)],
})
export class CoreModule {}
