import { HttpStatus } from '@nestjs/common';

export interface VerifyZarinPalInterface {
  data: {
    code: number;
    message: string;
    card_hash: string;
    card_pan: string;
    ref_id: number;
    fee_type: string;
    fee: number;
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
