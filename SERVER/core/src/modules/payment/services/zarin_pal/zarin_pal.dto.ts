import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export enum VerifyStatusEnum {
  OK = 'OK',
  NOK = 'NOK',
}

export class VerifyPaymentDto {
  @IsNotEmpty({ message: 'شناسه کاربر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  user: string;

  @IsNotEmpty({ message: 'اتوراریتی نمیتواند خالی باشد' })
  @IsString({ message: 'اتوراریتی باید رشته باشد' })
  key: string;

  @IsNotEmpty({ message: 'اتوراریتی نمیتواند خالی باشد' })
  @IsEnum(VerifyStatusEnum, { message: 'لطفا وضیعت را بهدرستی وارد نماید' })
  status: VerifyStatusEnum;
}
