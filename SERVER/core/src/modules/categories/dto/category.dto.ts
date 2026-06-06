import {
  IsNotEmpty,
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
  @Matches(/^([a-zA-Z]{3,36})$/)
  alias: string;

  @IsNotEmpty({ message: 'ایدی کاربر نمیتواند خالی باشد' })
  @IsString({ message: 'ایدی کاربر باید رشته باشد' })
  @IsUUID('4', { message: 'شما امکان ایجاد دسته بندی ندارید' })
  user: string;

  @IsNotEmpty({ message: 'ایدی ایکون نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی ایکون غیر معتبر است' })
  icon: string;
}

export class UpdateCategoryDto {
  @IsNotEmpty({ message: 'ایدی دسته بندی نمیتواند خالی باشد' })
  @IsString({ message: 'ایدی دسته بندی باید رشته باشد' })
  @IsUUID('4', { message: 'شما امکان ایجاد دسته بندی ندارید' })
  id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(24)
  title: string;

  @IsNotEmpty({ message: 'نامک نمیتواند خالی باشد' })
  @IsString({ message: 'نامک باید رشته باشد' })
  @Matches(/^([a-zA-Z]{3,36})$/)
  alias: string;

  @IsNotEmpty({ message: 'ایدی ایکون نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی ایکون غیر معتبر است' })
  icon: string;
}
