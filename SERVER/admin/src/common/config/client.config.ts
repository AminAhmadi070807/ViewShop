import { ClientsModuleAsyncOptions, Transport } from '@nestjs/microservices';
import { CORE_SERVICE } from '../constants/microservice.constant';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const ClientsModuleConfig: ClientsModuleAsyncOptions = [
  {
    name: CORE_SERVICE,
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => ({
      transport: Transport.TCP,
      options: {
        port: parseInt(config.get<string>('CORE_PORT', '4000'), 10) || 4000,
        host: config.get<string>('CORE_HOST'),
      },
    }),
    inject: [ConfigService],
  },
];
