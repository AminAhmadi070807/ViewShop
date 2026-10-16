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

  @IsUUID('4', { message: 'شناسه محصول نامعتبر است' })
  product: string;

  @IsUUID('4', { message: 'شناسه کاربر نامعتبر است' })
  user: string;

  @IsOptional()
  @IsUUID('4', { message: 'شناسه نظر والد نامعتبر است' })
  parentComment?: string;
}

export class UpdateCommentDto {
  @IsUUID('4', { message: 'ایدی کامنت نامعتبر است' })
  id: string;

  @IsBoolean({ message: 'وضیعت نظر نامعتبر است' })
  status: boolean;
}
