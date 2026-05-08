import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { CustomException } from '../exceptions/custom.exception.error';

@Injectable()
export class RedisService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly redis: Cache,
  ) {}

  async setCache(title: string, value: string, ttl: number) {
    await this.redis.set(title, value, ttl);
    return true;
  }

  async getCache(title: string): Promise<unknown> {
    const data: unknown = await this.redis.get(title);

    if (!data) {
      throw new CustomException('Data not found in redis.', 404);
    }

    return data;
  }
}
