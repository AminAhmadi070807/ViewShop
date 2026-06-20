import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

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
