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
import { ApiProperty } from '@nestjs/swagger';

export class StoreDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    minLength: 5,
    maxLength: 100,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان فروشگاه باید رشته باشد' })
  @MinLength(5, { message: 'عنوان حدثل باید 5 کارکتر داشته باشد' })
  @MaxLength(100, { message: 'عنوان حدکثر میتواند 100 کارکتر داشته باشد' })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    minLength: 5,
    maxLength: 100,
    example: '',
  })
  @IsNotEmpty({ message: 'نام مستعار فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'نام مستعار فروشگاه باید رشته باشد' })
  @MinLength(5, { message: 'نام مستعار حدثل باید 5 کارکتر داشته باشد' })
  @MaxLength(100, { message: 'نام مستعار حدکثر میتواند 100 کارکتر داشته باشد' })
  @Matches(/^[a-zA-Z0-9-_]{5,100}$/, {
    message: 'لطفا برای نام مستعار از کلمات انگلیسی استفاده کنید',
  })
  alias: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    minLength: 5,
    maxLength: 255,
    example: '',
  })
  @IsNotEmpty({ message: 'توضیحات فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات فروشگاه باید رشته باشد' })
  @MinLength(5, { message: 'توضیحات حدثل باید 5 کارکتر داشته باشد' })
  @MaxLength(255, { message: 'توضیحات حدکثر میتواند 255 کارکتر داشته باشد' })
  description: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی کاربر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی کاربر نامعتبر هست' })
  owner: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'لوگوی فروشگاه نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لوگوی فروشگاه نامعتبر هست' })
  logo: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'بنر فروشگاه نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'بنر فروشگاه نامعتبر هست' })
  banner: string;

  @ApiProperty({
    type: [String],
    isArray: true,
    required: true,
    nullable: false,
    example: [''],
  })
  @ArrayNotEmpty({ message: 'ارایه نمیتواند خالی باشد' })
  @IsArray({ message: 'لطفا براساس ارایه ارسال کنید' })
  @IsUUID('4', { message: 'شناسه دسته بندی ها نامعتبر هست', each: true })
  @IsOptional({ message: 'شنباسه دسته بندی اختیاری هست' })
  categories: string[];
}

export class UpdateStoreDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی نامعتبر هست' })
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    minLength: 5,
    maxLength: 100,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان فروشگاه باید رشته باشد' })
  @MinLength(5, { message: 'عنوان حدثل باید 5 کارکتر داشته باشد' })
  @MaxLength(100, { message: 'عنوان حدکثر میتواند 100 کارکتر داشته باشد' })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    minLength: 5,
    maxLength: 100,
    example: '',
  })
  @IsNotEmpty({ message: 'توضیحات فروشگاه نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات فروشگاه باید رشته باشد' })
  @MinLength(5, { message: 'توضیحات حدثل باید 5 کارکتر داشته باشد' })
  @MaxLength(100, { message: 'توضیحات حدکثر میتواند 255 کارکتر داشته باشد' })
  alias: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'لوگوی فروشگاه نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'لوگوی فروشگاه نامعتبر هست' })
  logo: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'بنر فروشگاه نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'بنر فروشگاه نامعتبر هست' })
  banner: string;
}
