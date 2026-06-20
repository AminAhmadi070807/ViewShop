import { Injectable } from '@nestjs/common';
import { ArticleDto } from './dto/article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  create(data: ArticleDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: ArticleDto) {}

  remove(id: string) {}
}
