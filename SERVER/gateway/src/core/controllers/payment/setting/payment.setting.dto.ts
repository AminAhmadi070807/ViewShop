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
import { ApiProperty } from '@nestjs/swagger';

class PaymentSettingDetailDto {
  @ApiProperty({ type: String, nullable: false, required: true, example: '' })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @ApiProperty({ type: String, nullable: false, required: true, example: '' })
  @IsString({ message: 'مقدار باید رشته باشد' })
  value: string;

  @ApiProperty({ type: String, nullable: false, required: true, example: '' })
  @IsString({ message: 'مقدار باید رشته باشد' })
  @Matches(/^([a-zA-Z-_]{3,36})$/, { message: 'پتر باید انگلیسی باشد' })
  pattern: string;
}

export class PaymentSettingDto {
  @ApiProperty({ type: String, nullable: false, required: true, example: '' })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @ApiProperty({ type: String, nullable: false, required: true, example: '' })
  @IsNotEmpty({ message: 'کلید پرداخت نامعتبر است' })
  @IsString({ message: 'کلید پرداخت نامعتبر است' })
  payment_key: string;

  @ApiProperty({ type: String, nullable: false, required: true, example: '' })
  @IsString({ message: 'نامک باید رشته باشد' })
  @Matches(/^([a-zA-Z-_]{3,36})$/, { message: 'نامک باید انگلیسی باشد' })
  alias: string;

  @ApiProperty({
    type: () => PaymentSettingDetailDto,
    isArray: true,
    required: true,
    nullable: false,
    example: PaymentSettingDetailDto,
  })
  @IsArray({ message: 'دیتاها باید در ارایه ارسال شوند' })
  @ArrayNotEmpty({ message: 'دیتاها نمیتواند در ارایه خالی باشد' })
  @ValidateNested({ each: true })
  @Type(() => PaymentSettingDetailDto)
  details: PaymentSettingDetailDto[];

  @ApiProperty({ type: String, nullable: false, required: true, example: '' })
  @IsUrl({}, { message: 'مسیر برگشت نامعتبر است' })
  call_back: string;

  @ApiProperty({ type: String, nullable: false, required: true, example: '' })
  @IsUrl({}, { message: 'ای پی ای نامعتبر است' })
  api: string;

  @ApiProperty({ type: Number, nullable: true, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'حدکثر قیمت نامعتبر است' })
  @IsPositive({ message: 'حدکثر قیمت نامعتبر است' })
  max_price?: number;
}

export class UpdatePaymentSettingDto {
  @ApiProperty({ type: String, nullable: false, required: true, example: '' })
  @IsUUID('4', { message: 'شناسه نامعتبر است' })
  id: string;

  @ApiProperty({
    type: () => PaymentSettingDetailDto,
    isArray: true,
    required: true,
    nullable: false,
    example: PaymentSettingDetailDto,
  })
  @IsArray({ message: 'دیتاها باید در ارایه ارسال شوند' })
  @ArrayNotEmpty({ message: 'دیتاها نمیتواند در ارایه خالی باشد' })
  @ValidateNested({ each: true })
  @Type(() => PaymentSettingDetailDto)
  details: PaymentSettingDetailDto[];

  @ApiProperty({ type: Number, nullable: true, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'حدکثر قیمت نامعتبر است' })
  @IsPositive({ message: 'حدکثر قیمت نامعتبر است' })
  max_price: number;
}
