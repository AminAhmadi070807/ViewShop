import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class ZarinPalDto {
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  user: string;

  @IsNumber({}, { message: 'مقدار پرداختی نامعتبر است' })
  @IsPositive({ message: 'مقدار پرداختی نامعتبر است' })
  amount: number;
}

export class ZarinPalVerifyDto {}
