import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class SubCategoryDto {
  @IsNotEmpty({ message: 'عنوان نباید خالی باشد' })
  @IsString({ message: 'عنواب باید رشته باشد' })
  @MinLength(3, { message: 'عنوان حدقل باید 3 کارتر داشته باشد' })
  @MaxLength(36, { message: 'عنوان حدکثر میتواند 36 کارکتر داشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'نامک نمیتواند خالی باشد' })
  @IsString({ message: 'نامک باید رشته باشد' })
  @MinLength(3, { message: 'نام مستعار حدقل باید 3 کارتر داشته باشد' })
  @MaxLength(36, { message: 'نام مستعار حدکثر میتواند 36 کارکتر داشته باشد' })
  @Matches(/^([a-zA-Z-_]{3,36})$/, {
    message:
      'نام مستعار باید انگلیسی باشد و حدقل 3 کارتر و حدکثر میتواند 36 کارکتر داشته باشد',
  })
  alias: string;

  @IsNotEmpty({ message: 'ایدی کاربر نمیتواند خالی باشد' })
  @IsString({ message: 'ایدی کاربر باید رشته باشد' })
  @IsUUID('4', { message: 'شما امکان ایجاد دسته بندی ندارید' })
  user: string;

  @IsNotEmpty({ message: 'ایدی دسته بندی والد نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی دسته بندی والد غیر معتبر هست' })
  category: string;

  @IsNotEmpty({ message: 'ایدی ایکون نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی ایکون غیر معتبر است' })
  icon: string;
}

export class UpdateSubCategoryDto extends PartialType(SubCategoryDto) {
  @IsNotEmpty({ message: 'ایدی نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی نمیتواند خالی باشد' })
  id: string;

  @IsNotEmpty({ message: 'عنوان نباید خالی باشد' })
  @IsString({ message: 'عنواب باید رشته باشد' })
  @MinLength(3, { message: 'عنوان حدقل باید 3 کارتر داشته باشد' })
  @MaxLength(36, { message: 'عنوان حدکثر میتواند 36 کارکتر داشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'نامک نمیتواند خالی باشد' })
  @IsString({ message: 'نامک باید رشته باشد' })
  @MinLength(3, { message: 'نام مستعار حدقل باید 3 کارتر داشته باشد' })
  @MaxLength(36, { message: 'نام مستعار حدکثر میتواند 36 کارکتر داشته باشد' })
  @Matches(/^([a-zA-Z-_]{3,36})$/, {
    message:
      'نام مستعار باید انگلیسی باشد و حدقل 3 کارتر و حدکثر میتواند 36 کارکتر داشته باشد',
  })
  alias: string;

  @IsNotEmpty({ message: 'ایدی کاربر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شما امکان ایجاد دسته بندی ندارید' })
  user: string;

  @IsNotEmpty({ message: 'ایدی دسته بندی والد نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی دسته بندی والد غیر معتبر هست' })
  category: string;

  @IsNotEmpty({ message: 'ایدی ایکون نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی ایکون غیر معتبر است' })
  icon: string;
}
