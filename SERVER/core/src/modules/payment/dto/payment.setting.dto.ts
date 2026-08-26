import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class PaymentSettingDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @IsUrl({}, { message: 'ای پی ای نامعتبر است' })
  api: string;

  @IsNotEmpty({ message: 'کلید نمیتواند خالی باشد' })
  @IsString({ message: 'کلید باید رشته باشد' })
  key: string;

  @IsUrl({}, { message: 'مسیر برگشت نمیتواند خالی باشد' })
  call_back: string;

  @IsUrl({}, { message: 'مسیر پرداخت نمیتواند خالی باشد' })
  url: string;
}
