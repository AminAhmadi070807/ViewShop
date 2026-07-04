import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FeatureDto {
  @ApiProperty({
    type: [String],
    isArray: true,
    required: true,
    nullable: false,
    example: [''],
  })
  @ArrayNotEmpty({ message: 'شناسه نقش نمیتواند خالی باشد' })
  @IsArray({ message: 'لطفا شناسه را براساس ارایه ارسال کنید' })
  @IsUUID('4', { message: 'شناسه نقش نامعتبر است', each: true })
  roles: [string];

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    minLength: 3,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'عنوان فیچر نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان فیچر باید رشته باشد' })
  @MinLength(3, { message: 'عنوان فیچر حدقل باید 3 کارکتر داشته باشد' })
  @MaxLength(50, { message: 'عنوان فیچر حدکثر میتواند 50 کارکتر داشته باشد' })
  title: string;
}

export class UpdateFeatureDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'شناسه نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'شناسه نامعتبر است' })
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    minLength: 3,
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  title: string;
}
