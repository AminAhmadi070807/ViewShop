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
import { SmsEnum, SmsServiceEnum } from '../../../common/enums/sms/sms.enum';
import { Type } from 'class-transformer';

class Details {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  @Matches(/^[a-zA-Z-_]+$/, { message: 'عنوان نامعتبر است' })
  title: string;

  @IsNotEmpty({ message: 'مقدار نمیتواند خالی باشد' })
  @IsString({ message: 'مقدار نامعتبر است' })
  value: string;
}

export class SmsSettingDto {
  @IsEnum(SmsEnum, { message: 'بخش نامعتبر است' })
  section: SmsEnum;

  @IsEnum(SmsServiceEnum, { message: 'سروریس پیامکی نامعتبر است' })
  service: SmsServiceEnum;

  @IsArray({ message: 'دیتاها باید ارایه باشد' })
  @ValidateNested({ each: true })
  @Type(() => Details)
  details: Details[];

  @IsBoolean({ message: 'حالت فعال نامعتبر است' })
  active: boolean;
}

export class UpdateSmsSettingDto {
  @IsUUID('4', { message: 'شناسه سرویس نامعتبر است' })
  id: string;

  @IsEnum(SmsEnum, { message: 'بخش نامعتبر است' })
  section: SmsEnum;

  @IsEnum(SmsServiceEnum, { message: 'سروریس پیامکی نامعتبر است' })
  service: SmsServiceEnum;

  @IsArray({ message: 'دیتاها باید ارایه باشد' })
  @ValidateNested({ each: true })
  @Type(() => Details)
  details: Details[];

  @IsBoolean({ message: 'حالت فعال نامعتبر است' })
  active: boolean;
}
