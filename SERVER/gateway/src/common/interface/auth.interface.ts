import { HttpStatus } from '@nestjs/common';

export interface AuthTokenInterface {
  access_token: string;
  refresh_token: string;
}

export interface AuthInterface {
  status: HttpStatus;
  body: AuthTokenInterface;
  message: string;
}

export interface AuthVerifyInterface {
  status: HttpStatus;
  body: {
    access_token: string;
  };
  message: string;
}

export interface AuthRegisterInterface {
  status: HttpStatus;
  body: {
    route: string;
  };
  message: string;
}
