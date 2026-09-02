import { IsEnum } from 'class-validator';
import { SmsEnum, SmsServiceEnum } from '../../../common/enums/sms/sms.enum';

export class SmsSettingDto {
  @IsEnum(SmsEnum, { message: 'بخش نامعتبر است' })
  section: SmsEnum;

  @IsEnum(SmsServiceEnum, { message: 'سروریس پیامکی نامعتبر است' })
  service: SmsServiceEnum;
}
