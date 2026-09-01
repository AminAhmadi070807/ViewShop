import {
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

enum status {
  OK = 'OK',
  NOK = 'NOK',
}

export class ZarinPalDto {
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  user: string;

  @IsNumber({}, { message: 'مقدار پرداختی نامعتبر است' })
  @IsPositive({ message: 'مقدار پرداختی نامعتبر است' })
  amount: number;
}

export class ZarinPalVerifyDto {
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  user: string;

  @IsString({ message: 'کلید پرداخت نامعتبر است' })
  @MinLength(36, { message: 'کلید پرداخت نامعتبر است' })
  @MaxLength(36, { message: 'کلید پرداخت نامعتبر است' })
  key: string;

  @IsEnum(status, { message: 'وضیعت پرداخت نامعتبر است' })
  status: string;
}
