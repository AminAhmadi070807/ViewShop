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
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(60)
  title: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @MinLength(8, { each: true })
  @MaxLength(60, { each: true })
  slug: [string];

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  description: string;

  @IsNotEmpty()
  @IsUUID()
  cover: string;

  @IsNotEmpty()
  @IsUUID()
  store: string;

  @IsNotEmpty()
  @IsUUID()
  author: string;

  @IsNotEmpty()
  @IsUUID()
  category: string;
}

export class UpdateArticleDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(60)
  title: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @MinLength(8, { each: true })
  @MaxLength(60, { each: true })
  slug: [string];

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  description: string;

  @IsNotEmpty()
  @IsUUID()
  cover: string;

  @IsNotEmpty()
  @IsUUID()
  store: string;

  @IsNotEmpty()
  @IsUUID()
  author: string;

  @IsNotEmpty()
  @IsEnum(UpdateArticleStatusEnum)
  status: UpdateArticleStatusEnum;

  @IsNotEmpty()
  @IsUUID()
  category: string;
}

export class UpdateArticleStatusDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsEnum(ArticleStatusEnum)
  status: ArticleStatusEnum;
}
