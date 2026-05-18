import { ClientsModuleAsyncOptions, Transport } from '@nestjs/microservices';
import { CORE_SERVICE } from '../constants/microservice.constant';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const ClientModuleConfig: ClientsModuleAsyncOptions = [
  {
    name: CORE_SERVICE,
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => ({
      transport: Transport.TCP,
      options: {
        host: config.get<string>('CORE_HOST'),
        port: parseInt(config.get<string>('CORE_PORT') as string, 10) ?? 4000,
      },
    }),
    inject: [ConfigService],
  },
];
