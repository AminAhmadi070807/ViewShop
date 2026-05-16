import { ClientsModuleAsyncOptions, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CORE_SERVICE } from '../constants/microservice.constant';

export const ClientsModuleConfig: ClientsModuleAsyncOptions = [
  {
    name: CORE_SERVICE,
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => ({
      transport: Transport.TCP,
      options: {
        port: parseInt(config.get<string>('', '4000'), 10) || 4000,
        host: config.get<string>('CORE_HOST', '127.0.0.1'),
      },
    }),
    inject: [ConfigService],
  },
];
