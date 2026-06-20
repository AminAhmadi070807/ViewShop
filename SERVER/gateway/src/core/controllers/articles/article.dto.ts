import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    minLength: 8,
    maxLength: 60,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(8, { message: 'حدقل عنوان باید 8 کارکتر داشته باشد' })
  @MaxLength(60, { message: 'عنوان حدکثر میتواند 60 کارکتر داشته بادشد' })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    minLength: 2,
    maxLength: 12,
    example: '',
  })
  @IsNotEmpty({ message: 'تگ ها نمیتواند خالی باشد' })
  @IsArray({ message: 'تگ هاباید رشته در ارایه باشد' })
  @IsString({ each: true, message: 'تگ ها باید رشته باشد' })
  @MinLength(2, { each: true, message: 'حدثل یک تگ باید 2 کارکتر داشته باشد' })
  @MaxLength(12, {
    each: true,
    message: 'حدکثر یک تگ میتواند 12 کارمتر داشته باشد',
  })
  slug: [string];

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    minLength: 8,
  })
  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(8, { message: 'حدقل توضیحات اولیه باید 8 کارکتر داشته باشد' })
  description: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی کاور نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی کاور نامعتبر هست' })
  cover: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی فروشگاه نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی فروشگاه نامعتبر هست' })
  store: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی دسته بندی نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی دسته بندی نامعتبر هست' })
  category: string;
}
