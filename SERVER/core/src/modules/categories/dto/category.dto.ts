import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CategoryDto {
  @IsNotEmpty({ message: 'عنوان نباید خالی باشد' })
  @IsString({ message: 'عنواب باید رشته باشد' })
  @MinLength(3, { message: 'عنوان حدقل باید 3 کارتر داشته باشد' })
  @MaxLength(36, { message: 'عنوان حدکثر میتواند 36 کارکتر داشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'نامک نمیتواند خالی باشد' })
  @IsString({ message: 'نامک نامعتبر است' })
  @Matches(/^([a-zA-Z0-9-_]{3,36})$/, { message: 'نامک نامعتبر است' })
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

  @IsNotEmpty({ message: 'عنوان نباید خالی باشد' })
  @IsString({ message: 'عنواب باید رشته باشد' })
  @MinLength(3, { message: 'عنوان حدقل باید 3 کارتر داشته باشد' })
  @MaxLength(36, { message: 'عنوان حدکثر میتواند 36 کارکتر داشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'نامک نمیتواند خالی باشد' })
  @IsString({ message: 'نامک نامعتبر است' })
  @Matches(/^([a-zA-Z0-9-_]{3,36})$/, { message: 'نامک نامعتبر است' })
  alias: string;

  @IsNotEmpty({ message: 'ایدی ایکون نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی ایکون غیر معتبر است' })
  icon: string;
}
