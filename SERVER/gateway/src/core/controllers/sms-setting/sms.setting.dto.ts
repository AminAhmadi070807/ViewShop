import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { SmsEnum, SmsServiceEnum } from '../../../common/sms/sms.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class Details {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  @Matches(/^([A-Z]){2,24}$/, { message: 'عنوان نامعتبر است' })
  title: string;

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
}
