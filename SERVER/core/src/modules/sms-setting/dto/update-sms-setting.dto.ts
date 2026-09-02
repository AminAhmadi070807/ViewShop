import { PartialType } from '@nestjs/mapped-types';
import { CreateSmsSettingDto } from './create-sms-setting.dto';

export class UpdateSmsSettingDto extends PartialType(CreateSmsSettingDto) {
  id: number;
}
