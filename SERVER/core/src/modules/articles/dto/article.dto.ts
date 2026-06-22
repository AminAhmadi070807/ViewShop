import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  ArticleStatusEnum,
  UpdateArticleStatusEnum,
} from '../../../common/enums/articles/articles.status';

export class ArticleDto {
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(8, { message: 'حدقل عنوان باید 8 کارکتر داشته باشد' })
  @MaxLength(60, { message: 'عنوان حدکثر میتواند 60 کارکتر داشته بادشد' })
  title: string;

  @IsNotEmpty({ message: 'تگ ها نمیتواند خالی باشد' })
  @IsArray({ message: 'تگ هاباید رشته در ارایه باشد' })
  @IsString({ each: true, message: 'تگ ها باید رشته باشد' })
  @MinLength(2, { each: true, message: 'حدثل یک تگ باید 2 کارکتر داشته باشد' })
  @MaxLength(12, {
    each: true,
    message: 'حدکثر یک تگ میتواند 12 کارمتر داشته باشد',
  })
  slug: [string];

  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(8, { message: 'حدقل توضیحات اولیه باید 8 کارکتر داشته باشد' })
  @MaxLength(5000, {
    message: 'توضیحات نمیتواند بیشتر از 5000 کارکتر داشته باشد',
  })
  description: string;

  @IsNotEmpty({ message: 'توضیح کوتاه نمیتواند خالی باشد' })
  @IsString({ message: 'توضیح کوتاه باید رشته باشد' })
  @MinLength(8, { message: 'حدقل توضیح کوتاه اولیه باید 8 کارکتر داشته باشد' })
  @MaxLength(255, {
    message: 'توضیح کوتاه نمیتواند بیشتر از 255 کارکتر داشته باشد',
  })
  shortDescription: string;

  @IsNotEmpty({ message: 'ایدی کاور نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی کاور نامعتبر هست' })
  cover: string;

  @IsNotEmpty({ message: 'ایدی فروشگاه نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی فروشگاه نامعتبر هست' })
  store: string;

  @IsNotEmpty({ message: 'ایدی نویسنده نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی نویسنده نامعتبر هست' })
  author: string;

  @IsNotEmpty({ message: 'ایدی دسته بندی نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی دسته بندی نامعتبر هست' })
  category: string;
}

export class UpdateArticleDto {
  @IsNotEmpty({ message: 'ایدی مقاله نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی مقاله نامعتبر هست' })
  id: string;

  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(8, { message: 'حدقل عنوان باید 8 کارکتر داشته باشد' })
  @MaxLength(60, { message: 'عنوان حدکثر میتواند 60 کارکتر داشته بادشد' })
  title: string;

  @IsNotEmpty({ message: 'تگ ها نمیتواند خالی باشد' })
  @IsArray({ message: 'تگ هاباید رشته در ارایه باشد' })
  @IsString({ each: true, message: 'تگ ها باید رشته باشد' })
  @MinLength(2, { each: true, message: 'حدثل یک تگ باید 2 کارکتر داشته باشد' })
  @MaxLength(12, {
    each: true,
    message: 'حدکثر یک تگ میتواند 12 کارمتر داشته باشد',
  })
  slug: [string];

  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(8, { message: 'حدقل توضیحات اولیه باید 8 کارکتر داشته باشد' })
  description: string;

  @IsNotEmpty({ message: 'ایدی کاور نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی کاور نامعتبر هست' })
  cover: string;

  @IsNotEmpty({ message: 'وضیعت نمیتواند خالی باشد' })
  @IsEnum(UpdateArticleStatusEnum, {
    message: 'وضیعت باید یکی از این ها باشد (COMPLETION, DRAFT)',
  })
  status: UpdateArticleStatusEnum;

  @IsNotEmpty({ message: 'ایدی دسته بندی نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی دسته بندی نامعتبر هست' })
  category: string;
}

export class UpdateArticleStatusDto {
  @IsNotEmpty({ message: 'ایدی مقاله نمیتواند خالی باشد' })
  @IsUUID('4', { message: 'ایدی مقاله نامعتبر هست' })
  id: string;

  @IsNotEmpty({ message: 'وضیعت نمیتواند خالی باشد' })
  @IsEnum(ArticleStatusEnum, {
    message:
      'وضیعت باید یکی از این ها باشد (COMPLETION, DELETED, PUBLISHED, DRAFT)',
  })
  status: ArticleStatusEnum;
}
