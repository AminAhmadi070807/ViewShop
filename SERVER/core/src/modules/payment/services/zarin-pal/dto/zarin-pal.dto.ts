import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ZarinPalDto {
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  user: string;

  @IsUUID('4', { message: 'شناسه سرویس پرداخت نامعتبر است' })
  payment: string;

  @IsNumber({}, { message: 'مقدار پرداختی نامعتبر است' })
  @IsPositive({ message: 'مقدار پرداختی نامعتبر است' })
  amount: number;
}

export class ZarinPalVerifyDto {}
