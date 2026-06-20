import { Injectable } from '@nestjs/common';
import { ArticleDto } from './dto/article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  create(data: ArticleDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: ArticleDto) {}

  remove(id: string) {}
}
