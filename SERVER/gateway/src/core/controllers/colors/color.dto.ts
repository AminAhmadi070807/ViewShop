import {
  IsHexColor,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ColorDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsNotEmpty({ message: 'کد رنگ نمیتواند خالی باشد' })
  @IsHexColor({ message: 'کد رنگ نامعتبر است' })
  color: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsUUID('4', { message: 'شناسه تصویر نامعتبر است' })
  @IsOptional({ message: 'شناسه تصویر اختیاری است' })
  media?: string;
}
