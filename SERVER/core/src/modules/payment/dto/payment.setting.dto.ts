import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PaymentSettingDetailDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @IsString({ message: 'مقدار باید رشته باشد' })
  value: string;

  @IsString({ message: 'مقدار باید رشته باشد' })
  @Matches(/^([a-zA-Z-_]{3,36})$/, { message: 'پتر باید انگلیسی باشد' })
  pattern: string;
}

export class PaymentSettingDto {
  @IsUUID('4', { message: 'لوگوی سرویس پرداخت نامعتبر است' })
  media: string;

  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'کلید پرداخت نامعتبر است' })
  @IsString({ message: 'کلید پرداخت نامعتبر است' })
  payment_key: string;

  @IsString({ message: 'نامک باید رشته باشد' })
  @Matches(/^([A-Z-_]{3,36})$/, { message: 'نامک باید انگلیسی باشد' })
  alias: string;

  @IsArray({ message: 'دیتاها باید در ارایه ارسال شوند' })
  @ArrayNotEmpty({ message: 'دیتاها نمیتواند در ارایه خالی باشد' })
  @ValidateNested({ each: true })
  @Type(() => PaymentSettingDetailDto)
  details: PaymentSettingDetailDto[];

  @IsUrl({}, { message: 'مسیر برگشت نامعتبر است' })
  call_back: string;

  @IsUrl({}, { message: 'ای پی ای نامعتبر است' })
  api: string;

  @IsOptional()
  @IsNumber({}, { message: 'حدکثر قیمت نامعتبر است' })
  @IsPositive({ message: 'حدکثر قیمت نامعتبر است' })
  max_price?: number;
}

export class UpdatePaymentSettingDto {
  @IsUUID('4', { message: 'شناسه نامعتبر است' })
  id: string;

  @IsArray({ message: 'دیتاها باید در ارایه ارسال شوند' })
  @ArrayNotEmpty({ message: 'دیتاها نمیتواند در ارایه خالی باشد' })
  @ValidateNested({ each: true })
  @Type(() => PaymentSettingDetailDto)
  details: PaymentSettingDetailDto[];

  @IsOptional()
  @IsNumber({}, { message: 'حدکثر قیمت نامعتبر است' })
  @IsPositive({ message: 'حدکثر قیمت نامعتبر است' })
  max_price?: number;
}
