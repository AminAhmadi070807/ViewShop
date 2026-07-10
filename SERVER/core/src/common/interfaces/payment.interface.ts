import { PaymentModelEnum } from '../enums/payment/ipg.enum';
import { HttpStatus } from '@nestjs/common';

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
