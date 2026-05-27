import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ClientsModuleConfig } from '../common/config/client.config';
import { CoreService } from './core.service';

@Global()
@Module({
  imports: [ClientsModule.registerAsync(ClientsModuleConfig)],
  providers: [CoreService],
  exports: [CoreService],
})
export class CoreModule {}
