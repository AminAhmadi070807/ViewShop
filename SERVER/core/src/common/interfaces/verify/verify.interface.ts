import { HttpStatus } from '@nestjs/common';
import { PaymentModelEnum } from '../../enums/payment/ipg.enum';

export interface PaymentVerifyInterface {
  userId: string;
  data: {
    merchant: string;
    amount: number;
    authority: string | number;
    url: string;
  };
}

export interface SendRequestInterface {
  url: string;
  amount: number;
  merchant: string | number;
  model: PaymentModelEnum;
  authority: string | number;
}

export interface VerifyInterface {
  data: {
    code: HttpStatus;
    message: string;
    card_hash: string;
  };
  errors: [];
}
