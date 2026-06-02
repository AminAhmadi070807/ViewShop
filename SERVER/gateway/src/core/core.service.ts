import { Inject, Injectable } from '@nestjs/common';
import { CORE_SERVICE } from '../common/constants/microservice.constant';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class CoreService {
  constructor(@Inject(CORE_SERVICE) private readonly client: ClientProxy) {}

  send(pattern: string, payload: unknown = {}): Observable<unknown> {
    console.log('CORE SERVICE =>', pattern);
    return this.client.send(pattern, payload);
  }
}
