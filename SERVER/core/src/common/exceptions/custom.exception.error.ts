import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';

export class CustomException extends RpcException {
  constructor(message: string, status: HttpStatus, data: object = {}) {
    super({ message, status, data });
  }
}
