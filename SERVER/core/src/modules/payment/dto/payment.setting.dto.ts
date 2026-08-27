import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

class PaymentSettingDetailDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @IsString({ message: 'مقدار باید رشته باشد' })
  value: string;

  @IsString({ message: 'مقدار باید رشته باشد' })
  @Matches(/^[a-zA-Z-_0-9]$/, { message: 'پتر باید انگلیسی باشد' })
  pattern: string;
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

export class UpdatePaymentSettingDto extends PartialType(PaymentSettingDto) {
  @IsUUID('4', { message: 'شناسه نامعتبر است' })
  id: string;
}
