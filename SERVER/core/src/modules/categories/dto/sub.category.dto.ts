import { IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class SubCategoryDto {
  @IsUUID('4', { message: 'شما امکان ایجاد دسته بندی ندارید' })
  user: string;

  @IsUUID('4', { message: 'ایدی دسته بندی والد غیر معتبر هست' })
  category: string;

  @IsUUID('4', { message: 'ایدی ایکون غیر معتبر است' })
  icon: string;

  @IsNotEmpty({ message: 'عنوان نباید خالی باشد' })
  @IsString({ message: 'عنواب باید رشته باشد' })
  @Matches(/^([a-zA-Z0-9-_ ]{3,36})$/, { message: 'عنوان نامعتبر است' })
  title: string;

  @IsNotEmpty({ message: 'نامک نمیتواند خالی باشد' })
  @IsString({ message: 'نامک باید رشته باشد' })
  @Matches(/^([a-zA-Z0-9-_]{3,36})$/, { message: 'نامک نامعتبر است' })
  alias: string;
}

export class UpdateSubCategoryDto extends PartialType(SubCategoryDto) {
  @IsUUID('4', { message: 'ایدی نمیتواند خالی باشد' })
  id: string;

  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  user: string;

  @IsUUID('4', { message: 'شناسه دسته بندی نامعتبر است' })
  category: string;

  @IsUUID('4', { message: 'شناسه ایکون نامعتبر است' })
  icon: string;

  @IsNotEmpty({ message: 'عنوان نباید خالی باشد' })
  @IsString({ message: 'عنواب باید رشته باشد' })
  @Matches(/^([a-zA-Z0-9-_ ]{3,36})$/, { message: 'عنوان نامعتبر است' })
  title: string;

  @IsNotEmpty({ message: 'نامک نمیتواند خالی باشد' })
  @IsString({ message: 'نامک باید رشته باشد' })
  @Matches(/^([a-zA-Z0-9-_]{3,36})$/, { message: 'نامک نامعتبر است' })
  alias: string;
}
