import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(24)
  title: string;

  @IsNotEmpty({ message: 'نامک نمیتواند خالی باشد' })
  @IsString({ message: 'نامک باید رشته باشد' })
  @Matches(/^([a-zA-Z].{8,36} | '')$/)
  link: string;

  @IsNotEmpty({ message: 'ایدی کاربر نمیتواند خالی باشد' })
  @IsString({ message: 'ایدی کاربر باید رشته باشد' })
  @IsUUID('4', { message: 'شما امکان ایجاد دسته بندی ندارید' })
  user: string;

  @IsNotEmpty({ message: 'ایدی ایکون نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی ایکون غیر معتبر است' })
  @IsOptional({ message: 'ایکون یک فیلد اختیاری است' })
  icon?: string;
}
