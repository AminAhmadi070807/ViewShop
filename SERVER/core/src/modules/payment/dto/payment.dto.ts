import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

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
}

export class VerifyPaymentDto {
  @IsNotEmpty({ message: 'شناسه کاربر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  user: string;

  @IsNotEmpty({ message: 'اتوراریتی نمیتواند خالی باشد' })
  @IsString({ message: 'اتوراریتی باید رشته باشد' })
  Authority: string;

  @IsNotEmpty({ message: 'اتوراریتی نمیتواند خالی باشد' })
  @IsEnum(status, { message: 'لطفا وضیعت را بهدرستی وارد نماید' })
  Status: string;
}
