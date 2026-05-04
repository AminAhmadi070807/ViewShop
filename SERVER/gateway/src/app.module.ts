import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule } from '@nestjs/microservices';
import { ClientsModuleConfig } from './common/config/client.config';
import { CoreModule } from './core/core.module';

@Module({
  imports: [ClientsModule.registerAsync(ClientsModuleConfig), CoreModule],
  controllers: [AppController],
})
export class AppModule {}
