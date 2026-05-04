import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { ClientsModuleConfig } from '../common/config/client.config';
import { ClientsModule } from '@nestjs/microservices';
import { UsersController } from './controllers/users/user.controller';

@Module({
  providers: [CoreService],
  imports: [ClientsModule.registerAsync(ClientsModuleConfig)],
  controllers: [UsersController],
})
export class CoreModule {}
