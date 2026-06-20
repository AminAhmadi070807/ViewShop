import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { ArticleStatusEnum } from '../../../common/enums/articles/articles.status';

export class ArticleDto {}

export class UpdateArticleStatusDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsEnum(ArticleStatusEnum)
  status: ArticleStatusEnum;
}
