import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArticleStatusEnum,
  UpdateArticleStatusEnum,
} from '../../../common/enums/articles/articles.enum';

export class ArticleDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    minLength: 8,
    maxLength: 60,
    example: '',
  })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(8, { message: 'حدقل عنوان باید 8 کارکتر داشته باشد' })
  @MaxLength(60, { message: 'عنوان حدکثر میتواند 60 کارکتر داشته بادشد' })
  title: string;

  @ApiProperty({
    type: [String],
    isArray: true,
    required: true,
    nullable: false,
    minLength: 2,
    maxLength: 12,
    example: [''],
  })
  @ArrayNotEmpty({ message: 'تگ ها نمیتواند خالی باشد' })
  @IsArray({ message: 'تگ هاباید رشته در ارایه باشد' })
  @IsString({ each: true, message: 'تگ ها باید رشته باشد' })
  @MinLength(2, { each: true, message: 'حدثل یک تگ باید 2 کارکتر داشته باشد' })
  @MaxLength(12, {
    each: true,
    message: 'حدکثر یک تگ میتواند 12 کارمتر داشته باشد',
  })
  slug: string[];

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    minLength: 8,
    maxLength: 5000,
  })
  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(8, { message: 'حدقل توضیحات اولیه باید 8 کارکتر داشته باشد' })
  @MaxLength(5000, {
    message: 'توضیحات نمیتواند بیشتر از 5000 کارکتر داشته باشد',
  })
  description: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    minLength: 8,
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'توضیح کوتاه نمیتواند خالی باشد' })
  @IsString({ message: 'توضیح کوتاه باید رشته باشد' })
  @MinLength(8, { message: 'حدقل توضیح کوتاه اولیه باید 8 کارکتر داشته باشد' })
  @MaxLength(255, {
    message: 'توضیح کوتاه نمیتواند بیشتر از 255 کارکتر داشته باشد',
  })
  shortDescription: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'ایدی کاور نامعتبر هست' })
  cover: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'ایدی فروشگاه نامعتبر هست' })
  store: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'ایدی دسته بندی نامعتبر هست' })
  category: string;
}

export class UpdateArticleDto {
  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'ایدی مقاله نامعتبر هست' })
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    minLength: 8,
    maxLength: 60,
  })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  @MinLength(8, { message: 'حدقل عنوان باید 8 کارکتر داشته باشد' })
  @MaxLength(60, { message: 'عنوان حدکثر میتواند 60 کارکتر داشته بادشد' })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    isArray: true,
    example: [''],
    minLength: 2,
    maxLength: 12,
  })
  @IsNotEmpty({ message: 'تگ ها نمیتواند خالی باشد' })
  @IsArray({ message: 'تگ هاباید رشته در ارایه باشد' })
  @IsString({ each: true, message: 'تگ ها باید رشته باشد' })
  @MinLength(2, { each: true, message: 'حدثل یک تگ باید 2 کارکتر داشته باشد' })
  @MaxLength(12, {
    each: true,
    message: 'حدکثر یک تگ میتواند 12 کارمتر داشته باشد',
  })
  slug: string[];

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    minLength: 8,
    maxLength: 5000,
  })
  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  @MinLength(8, { message: 'حدقل توضیحات اولیه باید 8 کارکتر داشته باشد' })
  description: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
    minLength: 8,
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'توضیح کوتاه نمیتواند خالی باشد' })
  @IsString({ message: 'توضیح کوتاه باید رشته باشد' })
  @MinLength(8, { message: 'حدقل توضیح کوتاه اولیه باید 8 کارکتر داشته باشد' })
  @MaxLength(255, {
    message: 'توضیح کوتاه نمیتواند بیشتر از 255 کارکتر داشته باشد',
  })
  shortDescription: string;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'ایدی کاور نامعتبر هست' })
  cover: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: UpdateArticleStatusEnum.DRAFT,
    enum: UpdateArticleStatusEnum,
  })
  @IsEnum(UpdateArticleStatusEnum, { message: 'وضیعت نامعتبر است' })
  status: UpdateArticleStatusEnum;

  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'ایدی دسته بندی نامعتبر هست' })
  category: string;
}

export class UpdateArticleStatusDto {
  @ApiProperty({ type: String, required: true, nullable: false, example: '' })
  @IsUUID('4', { message: 'ایدی مقاله نامعتبر هست' })
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: ArticleStatusEnum.PUBLISHED,
    enum: ArticleStatusEnum,
  })
  @IsEnum(ArticleStatusEnum, { message: 'وضیعت نامعتبر است' })
  status: ArticleStatusEnum;
}
