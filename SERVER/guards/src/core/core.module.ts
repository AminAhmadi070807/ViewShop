import { Global, Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { ClientsModule } from '@nestjs/microservices';
import { ClientsModuleConfig } from '../common/config/client.config';

@Global()
@Module({
  providers: [CoreService],
  exports: [CoreService],
  imports: [ClientsModule.registerAsync(ClientsModuleConfig)],
})
export class CoreModule {}
