import { Inject, Injectable } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
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

  async getOtpCache(title: string): Promise<Record<string, string>> {
    const result: string | undefined = await this.redis.get(`route:${title}`);

    if (!result) throw new CustomException('Otp code is not valid', 400);

    const items: string[] = result.split('___');

    const data: Record<string, string> = {};

    for (const item of items) {
      const keyAndValue: string[] = item.split(':=:');

      data[keyAndValue[0].trim()] = keyAndValue[1].trim();
    }

    return data;
  }
}
