import { HttpStatus } from '@nestjs/common';
import { PaymentModelEnum } from './payment.interface';

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
    card_hash: '0866A6EAEA5CB085E4CF6EF19296BF19647552DD5F96F1E530DB3AE61837EFE7';
  };
  errors: [];
}
