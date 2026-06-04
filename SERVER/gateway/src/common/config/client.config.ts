import { ClientsModuleAsyncOptions, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  CORE_SERVICE,
  GUARDS_SERVICE,
  PAYMENT_SERVICE,
} from '../constants/microservice.constant';

export const ClientsModuleConfig: ClientsModuleAsyncOptions = [
  {
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => ({
      transport: Transport.TCP,
      options: {
        port: parseInt(config.get<string>('CORE_PORT', '4000'), 10) || 4000,
        host: config.get<string>('CORE_HOST', '127.0.0.1'),
      },
    }),
    inject: [ConfigService],
    name: CORE_SERVICE,
  },
  {
    name: GUARDS_SERVICE,
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => ({
      transport: Transport.TCP,
      options: {
        port: parseInt(config.get<string>('GUARD_PORT', '4001'), 10) || 4001,
        host: config.get<string>('GUARD_HOST', '127.0.0.1'),
      },
    }),
    inject: [ConfigService],
  },
  {
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => ({
      transport: Transport.TCP,
      options: {
        port: parseInt(config.get<string>('PAYMENT_PORT', '4002'), 10) || 4002,
        host: config.get<string>('PAYMENT_HOST', '127.0.0.1'),
      },
    }),
    inject: [ConfigService],
    name: PAYMENT_SERVICE,
  },
];
