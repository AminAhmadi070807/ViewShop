import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StoryDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    minLength: 3,
    maxLength: 24,
  })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(3, { message: 'عنوان حدثل باید 3 کارکتر داشته باشد' })
  @MaxLength(24, { message: 'عنوان نمیتواند بیشتر از 24 کارکتر داشته باشد' })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsUrl(
    {
      require_protocol: true,
      protocols: ['http', 'https'],
    },
    { message: 'لطفا یک لینک درست وارد کنید' },
  )
  link: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty({ message: 'بنر نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی بنر نامعتبر هست' })
  banner: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty({ message: 'ویدیو نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی ویدیو نامعتبر هست' })
  video: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty({ message: 'دسته بندی نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی دسته بندی نامعتبر هست' })
  category: string;
}
