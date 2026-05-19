import { Inject, Injectable } from '@nestjs/common';
import { PAYMENT_SERVICE } from '../common/constants/microservice.constant';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(PAYMENT_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  send(pattern: string, data: unknown = {}) {
    return this.client.send(pattern, data);
  }
}
