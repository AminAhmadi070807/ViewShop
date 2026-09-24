import { IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @Matches(/^([a-zA-Z0-9-_]{3,36})$/, { message: 'عنوان نامعتبر است' })
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
  @Matches(/^([a-zA-Z0-9-_]{3,36})$/, { message: 'نامک نامعتبر است' })
  alias: string;

  @ApiProperty({ type: String, required: true, nullable: true, example: '' })
  @IsNotEmpty({ message: 'ایدی ایکون نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی ایکون غیر معتبر است' })
  icon: string;
}

export class UpdateCategoryDto {
  @ApiProperty({ type: String, required: true, nullable: true, example: '' })
  @IsUUID('4', { message: 'شناسه نامعتبر است' })
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
  @IsString({ message: 'عنوان نامعتبر است' })
  @Matches(/^([a-zA-Z0-9-_]{3,36})$/, { message: 'عنوان نامعتبر است' })
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
  @IsString({ message: 'نامک نامعتبر است' })
  @Matches(/^([a-zA-Z0-9-_]{3,36})$/, { message: 'نامک نامعتبر است' })
  alias: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
    example: '',
    description: 'icon id',
  })
  @IsUUID('4', { message: 'ایدی ایکون غیر معتبر است' })
  icon: string;
}
