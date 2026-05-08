import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-ioredis-yet';

export const CacheManagerModuleConfig: CacheModuleAsyncOptions = {
  imports: [ConfigModule],
  isGlobal: true,
  useFactory: async (config: ConfigService) => ({
    store: await redisStore({
      host: config.get<string>('CORE_DB_HOST') as string,
      port: config.get<string>('CORE_DB_REDIS_PORT'),
      db: 2,
      role: 'master',
    }),
    ttl: 180,
  }),
  inject: [ConfigService],
};
