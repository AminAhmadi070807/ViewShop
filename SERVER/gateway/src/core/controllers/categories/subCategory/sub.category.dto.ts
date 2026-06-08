import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubCategoryDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    minLength: 3,
    maxLength: 36,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان نباید خالی باشد' })
  @IsString({ message: 'عنواب باید رشته باشد' })
  @MinLength(3, { message: 'عنوان حدقل باید 3 کارتر داشته باشد' })
  @MaxLength(36, { message: 'عنوان حدکثر میتواند 36 کارکتر داشته باشد' })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    minLength: 3,
    maxLength: 36,
    pattern: /^([a-zA-Z-_]{3,36})$/,
    example: '',
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

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی دسته بندی والد نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی دسته بندی والد غیر معتبر هست' })
  category: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی ایکون نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی ایکون غیر معتبر است' })
  icon: string;
}
