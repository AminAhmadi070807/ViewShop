import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const TypeormModuleConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: config.get<string>('ADMIN_DB_HOST', '127.0.0.1'),
    port: parseInt(config.get<string>('ADMIN_DB_PORT', '5432')),
    username: config.get<string>('ADMIN_DB_USER', 'postgres'),
    password: config.get<string>('ADMIN_DB_PASS'),
    database: config.get<string>('ADMIN_DB_NAME', 'ViewShop_ADMIN'),
    autoLoadEntities: true,
    synchronize:
      config.get<'development' | 'production'>('NODE_ENV', 'development') ===
      'development',
  }),
  inject: [ConfigService],
};
