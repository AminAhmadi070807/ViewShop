import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MediaTypeEnum } from '../../../common/enums/media/media.enum';

export class MediaDto {
  @IsNotEmpty({ message: 'عنوان نباید خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'مسیر نباید خالی باشد' })
  @IsString({ message: 'مسیر باید رشته باشد' })
  path: string;

  @IsEnum(MediaTypeEnum, { message: 'نوع مدیا نامعتبر است' })
  type: MediaTypeEnum;

  @IsNotEmpty({ message: 'ایدی کاربر نباید خالی باشد' })
  @IsUUID('4', { message: 'ایدی نادرست است' })
  user: string;
}
