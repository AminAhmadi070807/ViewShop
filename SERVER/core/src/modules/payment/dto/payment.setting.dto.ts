import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PaymentSettingDetailDto {
  @IsOptional()
  @IsUUID('4', { message: 'شناسه دیتا نامعتبر است' })
  id?: string;

  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @IsString({ message: 'مقدار باید رشته باشد' })
  value?: string;
}

export class PaymentSettingDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @IsArray({ message: 'دیتاها باید در ارایه ارسال شوند' })
  @ArrayNotEmpty({ message: 'دیتاها نمیتواند در ارایه خالی باشد' })
  @ValidateNested({ each: true })
  @Type(() => PaymentSettingDetailDto)
  details: PaymentSettingDetailDto[];

  @IsNotEmpty({ message: 'مسیر برگشت نمیتواند خالی باشد' })
  @IsString({ message: 'مسیر برگشت باید رشته باشد' })
  call_back: string;

  @IsOptional()
  @IsNumber({}, { message: 'حدکثر قیمت نامعتبر است' })
  @IsPositive({ message: 'حدکثر قیمت نامعتبر است' })
  max_price?: number;
}
