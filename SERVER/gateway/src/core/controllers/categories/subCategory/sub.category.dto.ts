import { IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';
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
  @IsString({ message: 'عنواب نامعتبر است' })
  @Matches(/^([a-zA-Z0-9-_ ]{3,36})$/, { message: 'عنوان نامعتبر است' })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    minLength: 3,
    maxLength: 36,
    pattern: /^([a-zA-Z0-9-_]{3,36})$/,
    example: '',
  })
  @IsNotEmpty({ message: 'نامک نمیتواند خالی باشد' })
  @IsString({ message: 'نامک نامعتبر است' })
  @Matches(/^([a-zA-Z0-9-_]{3,36})$/, { message: 'نامک نامعتبر است' })
  alias: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsNotEmpty({ message: 'ایدی دسته بندی والد نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی دسته بندی والد غیر معتبر هست' })
  category: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'ایدی ایکون غیر معتبر است' })
  icon: string;
}

export class UpdateSubCategoryDto {
  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'شناسه نامعتبر است' })
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    minLength: 3,
    maxLength: 36,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان نباید خالی باشد' })
  @IsString({ message: 'عنوان نامعتبر است' })
  @Matches(/^([a-zA-Z0-9-_ ]{3,36})$/, { message: 'عنوان نامعتبر است' })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    minLength: 3,
    maxLength: 36,
    example: '',
  })
  @IsNotEmpty({ message: 'نامک نمیتواند خالی باشد' })
  @IsString({ message: 'نامک نامعتبر است' })
  @Matches(/^([a-zA-Z0-9-_]{3,36})$/, { message: 'نامک نامعتبر است' })
  alias: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'ایدی دسته بندی والد غیر معتبر هست' })
  category: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'ایدی ایکون غیر معتبر است' })
  icon: string;
}
