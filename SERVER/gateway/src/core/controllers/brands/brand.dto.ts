import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class BrandDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    minLength: 1,
    maxLength: 24,
  })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(1, { message: 'عنوان حدقل باید 1 کارکتر داشته باشد' })
  @MaxLength(24, { message: 'عنوان حدکثر میتواند 24 کارکتر داشته باشد' })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    minLength: 50,
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(50, { message: 'توضیحات حدقل باید 50 کارکتر داشته باشد' })
  @MaxLength(255, { message: 'توضیحات حدکثر میتواند 255 کارکتر داشته باشد' })
  description: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    minLength: 1,
    maxLength: 24,
    pattern: /^[a-zA-Z0-9-_]{1,24}$/,
  })
  @IsNotEmpty({ message: 'نام مستعار نمیتواند خالی باشد' })
  @IsString({ message: 'نام مستعار باید رشته باشد' })
  @MinLength(1, { message: 'نام مستعار حدقل باید 1 کارکتر داشته باشد' })
  @MaxLength(24, { message: 'نام مستعار حدکثر میتواند 24 کارکتر داشته باشد' })
  @Matches(/^[a-zA-Z0-9-_]{1,24}$/, {
    message: 'لطفا برای نام مستعار از کلمات انگلیسی استفاده کنید',
  })
  alias: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی لوگو نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی لوگو نامعبر است' })
  logo: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'لینک وبسایت اصلی نمیتواند خالی باشد' })
  @IsUrl({}, { message: 'لینک نامعتبر هست' })
  link: string;
}

export class UpdateBrandDto extends PartialType(BrandDto) {
  @IsNotEmpty({ message: 'شناسه برند نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه برند نامعبتر هست' })
  id: string;
}
