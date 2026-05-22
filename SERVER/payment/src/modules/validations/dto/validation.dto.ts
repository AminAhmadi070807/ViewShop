import { PaymentModelEnum } from '../../../common/interfaces/payment.interface';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ValidationDto {
  @IsNotEmpty({ message: 'سرویس پرداخت نمیتواند خالی باشد' })
  @IsString({ message: 'سرویس پرداخت باید رشته باشد' })
  @IsEnum(PaymentModelEnum, { message: 'سرویس پرداخت نام معتبر است' })
  IPG: PaymentModelEnum;

  @IsNotEmpty({ message: 'کد وضیعت نمیتواند خالی باشد' })
  @IsNumber(
    { allowInfinity: true, allowNaN: false },
    { message: 'کد وضیعت باید اعداد باشد' },
  )
  status: number;

  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(5, { message: 'توضیحات حدقل باید 5 کارکتر داشته باشد' })
  @MaxLength(255, { message: 'توضیحات حدکثر میتواند 50 کارکتر داشته باشد' })
  description: string;
}

export class FindValidationDto {
  @IsNotEmpty({ message: 'عنوان سرویس پرداخت نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان سرویس پرداخت نمیتواند خالی باشد' })
  @IsEnum(PaymentModelEnum, { message: 'سرویس پرداخت نامعتبر هست' })
  IPG: PaymentModelEnum;
}
