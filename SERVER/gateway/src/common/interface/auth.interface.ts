import { HttpStatus } from '@nestjs/common';

export interface AuthTokenInterface {
  access_token: string;
  refresh_token: string;
}

export interface AuthInterface {
  status: HttpStatus.OK;
  body: AuthTokenInterface;
  message: string;
}

export interface AuthValidateInterface {
  status: HttpStatus.OK;
  body: null;
  message: string;
}
