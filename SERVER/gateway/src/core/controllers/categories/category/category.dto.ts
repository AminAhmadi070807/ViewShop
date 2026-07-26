import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
    example: '',
    minLength: 3,
    maxLength: 24,
  })
  @IsNotEmpty({ message: 'عنوان نباید خالی باشد' })
  @IsString({ message: 'عنواب باید رشته باشد' })
  @MinLength(3, { message: 'عنوان حدقل باید 3 کارتر داشته باشد' })
  @MaxLength(36, { message: 'عنوان حدکثر میتواند 36 کارکتر داشته باشد' })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
    example: '',
    minLength: 3,
    maxLength: 36,
  })
  @IsNotEmpty({ message: 'نامک نمیتواند خالی باشد' })
  @IsString({ message: 'نامک باید رشته باشد' })
  @MinLength(3, { message: 'نام مستعار حدقل باید 3 کارتر داشته باشد' })
  @MaxLength(36, { message: 'نام مستعار حدکثر میتواند 36 کارکتر داشته باشد' })
  @Matches(/^([a-zA-Z-_]{3,36})$/, {
    message:
      'نام مستعار باید انگلیسی باشد و حدقل 3 کارتر و حدکثر میتواند 36 کارکتر داشته باشد',
  })
  alias: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: true,
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی ایکون نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی ایکون غیر معتبر است' })
  icon: string;

  @ApiPropertyOptional({
    type: [String],
    required: true,
    nullable: true,
    example: [''],
  })
  @ArrayNotEmpty({ message: 'شناسه فیلتر نمیتواند خالی باشد' })
  @IsArray({ message: 'شناسه های فیلتر باید در ارایه باشد' })
  @IsUUID('4', { message: 'شناسه فیلتر نامعتبر است', each: true })
  filter: string[];
}

export class UpdateCategoryDto {
  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: true,
    example: '',
    description: 'category id',
  })
  @IsNotEmpty({ message: 'ایدی دسته بندی نمیتواند خالی باشد' })
  @IsString({ message: 'ایدی دسته بندی باید رشته باشد' })
  @IsUUID('4', { message: 'شما امکان ایجاد دسته بندی ندارید' })
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
    example: '',
    description: 'category title',
    minLength: 3,
    maxLength: 24,
  })
  @IsNotEmpty({ message: 'عنوان نباید خالی باشد' })
  @IsString({ message: 'عنواب باید رشته باشد' })
  @MinLength(3, { message: 'عنوان حدقل باید 3 کارتر داشته باشد' })
  @MaxLength(36, { message: 'عنوان حدکثر میتواند 36 کارکتر داشته باشد' })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
    example: '',
    description: 'category alias name',
    minLength: 3,
    maxLength: 36,
  })
  @IsNotEmpty({ message: 'نامک نمیتواند خالی باشد' })
  @IsString({ message: 'نامک باید رشته باشد' })
  @Matches(/^([a-zA-Z-_]{3,36})$/)
  alias: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: true,
    example: '',
    description: 'icon id',
  })
  @IsNotEmpty({ message: 'ایدی ایکون نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی ایکون غیر معتبر است' })
  icon: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: true,
    example: '',
  })
  @IsNotEmpty({ message: 'شناسه فیلتر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه فیلتر نامعتبر است' })
  filter: string;
}
