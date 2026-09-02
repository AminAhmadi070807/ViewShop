import { IsEnum } from 'class-validator';
import { SmsEnum, SmsServiceEnum } from '../../../common/sms/sms.enum';
import { ApiProperty } from '@nestjs/swagger';

export class SmSettingDto {
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
