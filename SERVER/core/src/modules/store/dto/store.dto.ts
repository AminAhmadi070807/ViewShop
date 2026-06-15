import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class StoreDto {
  @IsNotEmpty({ message: 'عنوان فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان فروشگاه باید رشته باشد' })
  @MinLength(5, { message: 'عنوان حدثل باید 5 کارکتر داشته باشد' })
  @MaxLength(100, { message: 'عنوان حدکثر میتواند 100 کارکتر داشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'نام مستعار فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'نام مستعار فروشگاه باید رشته باشد' })
  @MinLength(5, { message: 'نام مستعار حدثل باید 5 کارکتر داشته باشد' })
  @MaxLength(100, { message: 'نام مستعار حدکثر میتواند 100 کارکتر داشته باشد' })
  @Matches(/^[a-zA-Z0-9-_]{5,100}$/, {
    message: 'لطفا برای نام مستعار از کلمات انگلیسی استفاده کنید',
  })
  alias: string;

  @IsNotEmpty({ message: 'توضیحات فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات فروشگاه باید رشته باشد' })
  @MinLength(5, { message: 'توضیحات حدثل باید 5 کارکتر داشته باشد' })
  @MaxLength(100, { message: 'توضیحات حدکثر میتواند 255 کارکتر داشته باشد' })
  description: string;

  @IsNotEmpty({ message: 'نام و نام خانوادگی صاحب فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'نام و نام خانوادگی صاحب فروشگاه باید رشته باشد' })
  @MinLength(8, {
    message: 'نام و نام خانوادگی صاحب حدثل باید 8 کارکتر داشته باشد',
  })
  @MaxLength(30, {
    message: 'نام و نام خانوادگی صاحب حدکثر میتواند 30 کارکتر داشته باشد',
  })
  fullName: string;

  @IsNotEmpty({ message: 'لوگوی فروشگاه نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لوگوی فروشگاه نامعتبر هست' })
  logo: string;

  @IsNotEmpty({ message: 'بنر فروشگاه نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'بنر فروشگاه نامعتبر هست' })
  banner: string;

  @ArrayNotEmpty({ message: 'ارایه نمیتواند خالی باشد' })
  @IsArray({ message: 'لطفا براساس ارایه ارسال کنید' })
  @IsUUID('4', { message: 'شناسه دسته بندی ها نامعتبر هست', each: true })
  @IsOptional({ message: 'شنباسه دسته بندی اختیاری هست' })
  categories: string[];
}

export class UpdateStoreDto {
  @IsNotEmpty({ message: 'ایدی نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی نامعتبر هست' })
  id: string;

  @IsNotEmpty({ message: 'عنوان فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان فروشگاه باید رشته باشد' })
  @MinLength(5, { message: 'عنوان حدثل باید 5 کارکتر داشته باشد' })
  @MaxLength(100, { message: 'عنوان حدکثر میتواند 100 کارکتر داشته باشد' })
  title: string;

  @IsNotEmpty({ message: 'توضیحات فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات فروشگاه باید رشته باشد' })
  @MinLength(5, { message: 'توضیحات حدثل باید 5 کارکتر داشته باشد' })
  @MaxLength(100, { message: 'توضیحات حدکثر میتواند 255 کارکتر داشته باشد' })
  alias: string;

  @IsNotEmpty({ message: 'لوگوی فروشگاه نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لوگوی فروشگاه نامعتبر هست' })
  logo: string;

  @IsNotEmpty({ message: 'بنر فروشگاه نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'بنر فروشگاه نامعتبر هست' })
  banner: string;
}
