import { HttpStatus } from '@nestjs/common';

export enum PaymentModelEnum {
  ZARIN_PAL = 'ZARIN_PAL',
  ZIBAL = 'ZIBAL',
}

export interface SendRequestInterface {
  url: string;
  description: string;
  amount: number;
  merchant: string;
  callbackUrl: string;
  model: PaymentModelEnum;
}

export interface ZarinPalInterface {
  data: {
    authority: string;
    fee: number;
    fee_type: string;
    code: HttpStatus;
    message: string;
  };
  errors: [];
}
