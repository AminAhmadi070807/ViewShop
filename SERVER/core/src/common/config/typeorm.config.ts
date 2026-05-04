import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const TypeOrmModuleConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: config.get<string>('CORE_DB_HOST', '127.0.0.1'),
    port: parseInt(config.get<string>('CORE_DB_PORT', '5432')),
    username: config.get<string>('CORE_DB_USER', 'postgres'),
    password: config.get<string>('CORE_DB_PASS'),
    database: config.get<string>('CORE_DB_NAME', 'ViewShop_Core'),
    autoLoadEntities: true,
    synchronize:
      config.get<'development' | 'production'>('NODE_ENV', 'development') ===
      'development',
  }),
  inject: [ConfigService],
};
