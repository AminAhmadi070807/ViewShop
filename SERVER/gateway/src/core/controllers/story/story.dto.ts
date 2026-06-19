import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class StoryDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(3, { message: 'عنوان حدثل باید 3 کارکتر داشته باشد' })
  @MaxLength(24, { message: 'عنوان نمیتواند بیشتر از 24 کارکتر داشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'لینک باید رشته باشد' })
  link: string;

  @IsNotEmpty({ message: 'بنر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی بنر نامعتبر هست' })
  banner: string;

  @IsNotEmpty({ message: 'ویدیو نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی ویدیو نامعتبر هست' })
  video: string;

  @IsNotEmpty({ message: 'دسته بندی نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی دسته بندی نامعتبر هست' })
  category: string;
}
