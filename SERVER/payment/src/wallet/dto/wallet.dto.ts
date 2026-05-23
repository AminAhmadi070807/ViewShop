import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { PaymentModelEnum } from '../../common/interfaces/payment.interface';

export class WalletDto {
  @IsNotEmpty({ message: 'شناسه کاربر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه کاربر نادرست است' })
  userId: string;

  @IsNotEmpty({ message: 'نوع سرویس پرداخت نمیتواند خالی باشد' })
  @IsEnum(PaymentModelEnum, { message: 'نوع سرویس پرداخت نادرست است' })
  IPG: PaymentModelEnum;

  @IsNotEmpty({ message: 'مقدار نمیتوناد خالی باشد' })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: 'مقدار باید اعداد باشد' },
  )
  @IsInt({ message: 'مقدار باید بزرگتر از 500000' })
  @Min(500_000, { message: 'مقدار حدقل باید 50000 هزار تومان باشد' })
  @Max(1_000_000_000, {
    message: 'مقدار حدکثر میتواند 100000000 هزار تومان باشد',
  })
  amount: number;
}
