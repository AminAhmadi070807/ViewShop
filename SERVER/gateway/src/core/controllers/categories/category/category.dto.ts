import {
  IsNotEmpty,
  IsOptional,
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
    description: 'category title',
    minLength: 3,
    maxLength: 24,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(24)
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
    example: '',
    description: 'category alias name',
    minLength: 8,
    maxLength: 36,
  })
  @IsNotEmpty({ message: 'نامک نمیتواند خالی باشد' })
  @IsString({ message: 'نامک باید رشته باشد' })
  @Matches(/^([a-zA-Z].{8,36} | '')$/)
  link: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    nullable: true,
    example: '',
    description: 'icon id',
  })
  @IsNotEmpty({ message: 'ایدی ایکون نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی ایکون غیر معتبر است' })
  @IsOptional({ message: 'ایکون یک فیلد اختیاری است' })
  icon?: string;
}
