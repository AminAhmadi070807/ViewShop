import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '',
    minLength: 5,
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(5, { message: 'توضیحات حدقل باید 5 کاراکتر داشته باشد' })
  @MaxLength(255, {
    message: 'توضیحات نمیتواند بیشتر از 255 کارکتر داشته باشد',
  })
  description: string;

  @ApiProperty({
    type: Number,
    required: true,
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  @IsNotEmpty({ message: 'نمره نمیتواند خالی باشد' })
  @IsNumber(
    { allowInfinity: true, allowNaN: false },
    { message: 'نمره باید اعداد باشد' },
  )
  @Min(1, { message: 'نمره حدقل میتواند 1 باشد' })
  @Max(5, { message: 'نمره حدکثر میتواند 5 باشد' })
  score: number;

  @ApiProperty({
    type: String,
    required: true,
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی محصول نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی محصول نامعتبر است' })
  product: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    example: '',
  })
  @IsOptional({ message: 'ایدی کامنت اختیاری است' })
  @IsNotEmpty({ message: 'ایدی کامنت نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی کامنت نامعتبر است' })
  parentComment?: string;
}

export class UpdateCommentDto {
  @ApiPropertyOptional({
    type: String,
    required: true,
    example: '',
  })
  @IsNotEmpty({ message: 'ایدی کامنت نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی کامنت نامعتبر است' })
  id: string;

  @ApiPropertyOptional({
    type: Boolean,
    required: true,
    example: true,
  })
  @IsNotEmpty({ message: 'وضیعت کامنت نمیتواند خالی باشد' })
  @IsBoolean({ message: 'لطفا وضیع کامنت را براساس (true, false) وارد کنید' })
  status: boolean;
}
