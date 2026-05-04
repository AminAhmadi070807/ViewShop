import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule } from '@nestjs/microservices';
import { ClientsModuleConfig } from './common/config/client.config';

@Module({
  imports: [ClientsModule.registerAsync(ClientsModuleConfig)],
  controllers: [AppController],
})
export class AppModule {}
