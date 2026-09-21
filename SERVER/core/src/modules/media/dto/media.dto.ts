import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
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
}
