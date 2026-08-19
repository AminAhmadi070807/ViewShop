import { IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { SmsEnum, SmsServiceEnum } from '../../../common/sms/sms.enum';
import { ApiProperty } from '@nestjs/swagger';

export class SmDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: '',
  })
  @IsPhoneNumber('IR', { message: 'شماره تلفن نامعتبر است' })
  cell_phone: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    example: '',
  })
  @IsNotEmpty({ message: 'پیام نمیتواند خالی باشد' })
  @IsString({ message: 'پیام نامعتبر است' })
  message: string;

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
}

export class SmSettingDto {
  @IsEnum(SmsEnum, { message: 'بخش نامعتبر است' })
  section: SmsEnum;

  @IsEnum(SmsServiceEnum, { message: 'سروریس پیامکی نامعتبر است' })
  service: SmsServiceEnum;
}

