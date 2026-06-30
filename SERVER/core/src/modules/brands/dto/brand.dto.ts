import {
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class BrandDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(1, { message: 'عنوان حدقل باید 1 کارکتر داشته باشد' })
  @MaxLength(24, { message: 'عنوان حدکثر میتواند 24 کارکتر داشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'نام مستعار نمیتواند خالی باشد' })
  @IsString({ message: 'نام مستعار باید رشته باشد' })
  @MinLength(1, { message: 'نام مستعار حدقل باید 1 کارکتر داشته باشد' })
  @MaxLength(24, { message: 'نام مستعار حدکثر میتواند 24 کارکتر داشته باشد' })
  alias: string;

  @IsNotEmpty({ message: 'لینک وبسایت اصلی نمیتواند خالی باشد' })
  @IsUrl({}, { message: 'لینک نامعتبر هست' })
  link: string;
}
