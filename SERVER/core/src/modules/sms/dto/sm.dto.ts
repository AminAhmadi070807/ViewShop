import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { SmsEnum, SmsServiceEnum } from '../../../common/enums/sms/sms.enum';

export class SmDto {
  @IsPhoneNumber('IR', { message: 'شماره تلفن نامعتبر است' })
  cell_phone: string;

  @IsNotEmpty({ message: 'پیام نمیتواند خالی باشد' })
  @IsString({ message: 'پیام نامعتبر است' })
  message: string;

  @IsEnum(SmsEnum, { message: 'بخش نامعتبر است' })
  @IsOptional({ message: 'ارسال بخش اختیاری است' })
  section: SmsEnum;

  @IsEnum(SmsServiceEnum, { message: 'سروریس پیامکی نامعتبر است' })
  service: SmsServiceEnum;
}

export class SmSettingDto {
  @IsEnum(SmsEnum, { message: 'بخش نامعتبر است' })
  section: SmsEnum;

  @IsEnum(SmsServiceEnum, { message: 'سروریس پیامکی نامعتبر است' })
  service: SmsServiceEnum;
}
