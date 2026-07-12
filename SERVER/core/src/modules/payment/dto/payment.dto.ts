import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PaymentSectionEnum } from '../../../common/enums/payment/section.enum';

enum status {
  OK = 'OK',
  NOK = 'NOK',
}

export class PaymentDto {
  @IsNotEmpty({ message: 'شناسه کاربر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  user: string;

  @IsNotEmpty({ message: 'قیمت نمیتواند خالی باشد' })
  @IsNumber(
    { allowInfinity: true, allowNaN: false },
    { message: 'قیمت باید عداد باشد' },
  )
  @IsInt({
    message: 'قیمت نامعتبر است',
  })
  amount: number;

  @IsNotEmpty({ message: 'سرویس نمیتواند خالی باشد' })
  @IsEnum(PaymentSectionEnum, { message: 'سرویس نامعتبر است' })
  service: PaymentSectionEnum;

  @IsNotEmpty({ message: 'شناسه سرویس نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه سرویس نامعتبر است' })
  service_id: string;

  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(8, { message: 'توضیحات حدقل باید 8 کارکتر داشته باشد' })
  @MaxLength(54, { message: 'توضیحات حدکثر میتواند 54 کارکتر داشته باشد' })
  description: string;
}

export class VerifyPaymentDto {
  @IsNotEmpty({ message: 'شناسه کاربر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  user: string;

  @IsNotEmpty({ message: 'اتوراریتی نمیتواند خالی باشد' })
  @IsString({ message: 'اتوراریتی باید رشته باشد' })
  authority: string;

  @IsNotEmpty({ message: 'اتوراریتی نمیتواند خالی باشد' })
  @IsEnum(status, { message: 'لطفا وضیعت را بهدرستی وارد نماید' })
  status: string;
}
