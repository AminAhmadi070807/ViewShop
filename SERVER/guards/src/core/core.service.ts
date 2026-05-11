import { Inject, Injectable } from '@nestjs/common';
import { CORE_SERVICE } from '../common/constants/microservice.constant';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CoreService {
  constructor(@Inject(CORE_SERVICE) private readonly client: ClientProxy) {}

  send(pattern: string, data: unknown = {}) {
    return this.client.send(pattern, data);
  }
}
