import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  ValidateNested,
} from 'class-validator';
import { SmsEnum, SmsServiceEnum } from '../../../common/sms/sms.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class Details {
  @ApiProperty({ type: String, nullable: false, required: true, example: '' })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  @Matches(/^[a-zA-Z-_]+$/, { message: 'عنوان نامعتبر است' })
  title: string;

  @ApiProperty({ type: String, nullable: false, required: true, example: '' })
  @IsNotEmpty({ message: 'مقدار نمیتواند خالی باشد' })
  @IsString({ message: 'مقدار نامعتبر است' })
  value: string;
}

export class SmsSettingDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    enum: SmsEnum,
    example: SmsEnum.OTP,
  })
  @IsEnum(SmsEnum, { message: 'بخش نامعتبر است' })
  section: SmsEnum;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    enum: SmsServiceEnum,
    example: SmsServiceEnum.SMS_IR,
  })
  @IsEnum(SmsServiceEnum, { message: 'سروریس پیامکی نامعتبر است' })
  service: SmsServiceEnum;

  @ApiProperty({
    type: () => Details,
    nullable: false,
    required: true,
    isArray: true,
    example: Details,
  })
  @IsArray({ message: 'دیتاها باید ارایه باشد' })
  @ValidateNested({ each: true })
  @Type(() => Details)
  details: Details[];

  @ApiProperty({
    type: String,
    nullable: false,
    required: false,
    example: true,
  })
  @IsBoolean({ message: 'حالت فعال نامعتبر است' })
  active: boolean;
}

export class UpdateSmsSettingDto {
  @ApiProperty({ type: String, nullable: false, required: true, example: '' })
  @IsUUID('4', { message: 'شناسه سرویس نامعتبر است' })
  id: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    enum: SmsEnum,
    example: SmsEnum.OTP,
  })
  @IsEnum(SmsEnum, { message: 'بخش نامعتبر است' })
  section: SmsEnum;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    enum: SmsServiceEnum,
    example: SmsServiceEnum.SMS_IR,
  })
  @IsEnum(SmsServiceEnum, { message: 'سروریس پیامکی نامعتبر است' })
  service: SmsServiceEnum;

  @ApiProperty({
    type: () => Details,
    nullable: false,
    required: true,
    isArray: true,
    example: Details,
  })
  @IsArray({ message: 'دیتاها باید ارایه باشد' })
  @ValidateNested({ each: true })
  @Type(() => Details)
  details: Details[];

  @ApiProperty({
    type: String,
    nullable: false,
    required: false,
    example: true,
  })
  @IsBoolean({ message: 'حالت فعال نامعتبر است' })
  active: boolean;
}
