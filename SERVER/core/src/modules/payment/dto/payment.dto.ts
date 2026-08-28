import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export enum VerifyStatusEnum {
  OK = 'OK',
  NOK = 'NOK',
}

export class PaymentDto {
  @IsUUID('4', { message: 'شناسه پرداخت نامعتبر است نامعتبر است' })
  payment: string;

  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  user: string;

  @IsNumber({}, { message: 'قیمت باید عداد باشد' })
  @IsPositive({ message: 'قیمت نامعتبر است' })
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
  @IsEnum(VerifyStatusEnum, { message: 'لطفا وضیعت را بهدرستی وارد نماید' })
  Status: VerifyStatusEnum;
}
