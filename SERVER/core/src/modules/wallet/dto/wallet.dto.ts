import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class WalletDto {
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر هست' })
  user: string;

  @IsNumber({}, { message: 'مقدار پرداختی نامعتبر است' })
  @IsPositive({ message: 'مقدار پرداختی نامعتبر است' })
  amount: number;

  @IsNotEmpty({ message: 'سرویس پرداخت نامعتبر است' })
  @IsString({ message: 'سرویس پرداخت نامعتبر است' })
  service: string;

  @IsNotEmpty({ message: 'شناسه پرداخت نامعتبر است' })
  @IsString({ message: 'شناسه پرداخت نامعتبر است' })
  key: string;
}

export class WalletPaymentDto {
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر هست' })
  user: string;

  @IsNumber({}, { message: 'مقدار پرداختی نامعتبر است' })
  @IsPositive({ message: 'مقدار پرداختی نامعتبر است' })
  amount: number;
}
