import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { MediaTypeEnum } from '../../../common/enums/media/media.enum';

export class MediaDto {
  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  user: string;

  @IsNotEmpty({ message: 'عنوان نباید خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'مسیر نباید خالی باشد' })
  @IsString({ message: 'مسیر باید رشته باشد' })
  path: string;

  @IsEnum(MediaTypeEnum, { message: 'نوع مدیا نامعتبر است' })
  type: MediaTypeEnum;
}
