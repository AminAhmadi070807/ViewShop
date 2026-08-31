import {
  IsNotEmpty,
  IsNumber,
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

  @IsNotEmpty({ message: 'شناسه کلید پرداخت نمیتواند خالی باشد' })
  @IsString({ message: 'شناسه کلید پرداخت نامعتبر است' })
  @MinLength(36, { message: 'شناسه کلید پرداخت نامعتبر است' })
  @MaxLength(36, { message: 'شناسه کلید پرداخت نامعتبر است' })
  merchant_id: string;

  @IsUrl({}, { message: 'مسیر بازگشت نامعتبر است' })
  callback_url: string;

  @IsNumber({}, { message: 'مقدار پرداختی نامعتبر است' })
  @IsPositive({ message: 'مقدار پرداختی نامعتبر است' })
  amount: number;
}

export class ZarinPalVerifyDto {}
