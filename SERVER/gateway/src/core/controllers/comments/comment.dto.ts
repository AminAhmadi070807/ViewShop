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

export class CommentDto {
  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(5, { message: 'توضیحات حدقل باید 5 کاراکتر داشته باشد' })
  @MaxLength(255, {
    message: 'توضیحات نمیتواند بیشتر از 255 کارکتر داشته باشد',
  })
  description: string;

  @IsNotEmpty({ message: 'نمره نمیتواند خالی باشد' })
  @IsNumber(
    { allowInfinity: true, allowNaN: false },
    { message: 'نمره باید اعداد باشد' },
  )
  @Min(1, { message: 'نمره حدقل میتواند 1 باشد' })
  @Max(5, { message: 'نمره حدکثر میتواند 5 باشد' })
  score: number;

  @IsNotEmpty({ message: 'ایدی محصول نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی محصول نامعتبر است' })
  product: string;

  @IsNotEmpty({ message: 'ایدی کامنت نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی کامنت نامعتبر است' })
  @IsOptional({ message: 'ایدی کامنت اختیاری است' })
  parentComment: string;
}

export class UpdateCommentDto {
  @IsNotEmpty({ message: 'ایدی کامنت نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی کامنت نامعتبر است' })
  id: string;

  @IsNotEmpty({ message: 'وضیعت کامنت نمیتواند خالی باشد' })
  @IsBoolean({ message: 'لطفا وضیع کامنت را براساس (true, false) وارد کنید' })
  status: boolean;
}
