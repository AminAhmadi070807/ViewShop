import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const TypeOrmModuleConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: config.get<string>('GUARD_DB_HOST', '127.0.0.1'),
    port: parseInt(config.get<string>('GUARD_DB_PORT', '5432')),
    username: config.get<string>('GUARD_DB_USER', 'postgres'),
    password: config.get<string>('GUARD_DB_PASS', '@Amin2007'),
    database: config.get<string>('GUARD_DB_NAME', 'ViewShop_Guard'),
    autoLoadEntities: true,
    synchronize:
      config.get<'development' | 'production'>('NODE_ENV', 'development') ===
      'development',
  }),
  inject: [ConfigService],
};
