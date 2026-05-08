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

export interface AuthVerifyInterface {
  status: HttpStatus.OK;
  body: {
    access_token: string;
  };
  message: string;
}
