import { Inject, Injectable } from '@nestjs/common';
import { GUARDS_SERVICE } from '../common/constants/microservice.constant';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class GuardsService {
  constructor(
    @Inject(GUARDS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  send(pattern: string, data: unknown = {}) {
    console.log('GUARD PATTERN', pattern);
    return this.client.send(pattern, data);
  }
}
