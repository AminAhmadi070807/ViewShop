import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { StoryStatusEnum } from '../../../common/enums/story/status.enum';

export class StoryDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(3, { message: 'عنوان حدثل باید 3 کارکتر داشته باشد' })
  @MaxLength(36, { message: 'عنوان نمیتواند بیشتر از 36 کارکتر داشته باشد' })
  title: string;

  @IsUUID('4', { message: 'ایدی کاربر نامعتبر هست' })
  user: string;

  @IsUUID('4', { message: 'شناسه محصول نامعتبر است' })
  product: string;

  @IsUUID('4', { message: 'ایدی بنر نامعتبر هست' })
  banner: string;

  @IsUUID('4', { message: 'ایدی ویدیو نامعتبر هست' })
  video: string;

  @IsUUID('4', { message: 'ایدی دسته بندی نامعتبر هست' })
  category: string;
}

export class UpdateStoryDto {
  @IsUUID('4', { message: 'شناسه نامعتبر است' })
  id: string;

  @IsEnum(StoryStatusEnum, { message: 'وضیعت نامعتبر است' })
  status: StoryStatusEnum;
}
