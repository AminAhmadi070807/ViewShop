import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AttributeCategoryDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    minLength: 3,
    maxLength: 36,
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

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی ایکون نمیتواند خالی باشد' })
  @IsString({ message: 'ایدی ایکون باید رشته باشد' })
  @IsUUID('4', { message: 'ایدی ایکون نادرست قابل قبول نیست' })
  icon: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی زیر دسته بندی نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی زیر دسته بندی غیر معتبر هست' })
  subCategory: string;
}
