import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

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

  @IsNotEmpty({ message: 'ایدی ایکون نمیتواند خالی باشد' })
  @IsString({ message: 'ایدی ایکون باید رشته باشد' })
  @IsUUID('4', { message: 'ایدی ایکون نادرست قابل قبول نیست' })
  icon: string;

  @IsNotEmpty({ message: 'ایدی زیر دسته بندی نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی زیر دسته بندی غیر معتبر هست' })
  subCategory: string;
}
