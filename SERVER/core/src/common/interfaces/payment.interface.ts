import { HttpStatus } from '@nestjs/common';

export interface VerifyZarinPalInterface {
  data: {
    code: number;
  };
  errors: [];
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
