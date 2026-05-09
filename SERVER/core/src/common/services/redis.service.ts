import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit(): void {
    const host = this.configService.get<string>('CORE_DB_REDIS_HOST') as string;
    const port = parseInt(
      this.configService.get<'6379'>('CORE_DB_REDIS_PORT', '6379'),
    );
    const pass = this.configService.get<string>('CORE_REDIS_PASS') as string;
    const db = this.configService.get<number>('CORE_REDIS_DB') as number;

    this.client = new Redis({
      host,
      port,
      db,
      password: pass || undefined,
    });

    this.client.on('connect', () => console.log('[Redis] Connected'));

    this.client.on('error', (err) => console.error('[Redis] error:', err));
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.quit();
    }
  }

  async set(key: string, value: string, second: number): Promise<void> {
    await this.client.set(key, value, 'EX', second);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async ttl(key: string): Promise<number> {
    const ttl: number = await this.client.ttl(key);

    return Number(ttl);
  }
}
