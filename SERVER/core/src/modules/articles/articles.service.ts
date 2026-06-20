import { Injectable } from '@nestjs/common';
import { ArticleDto } from './dto/article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  create(data: ArticleDto) {}

  async findAll() {
    try {
      const articles: Article[] = await this.articleRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: articles,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const article: Article | null = await this.articleRepository.findOneBy({
        id,
      });

      if (!article) return new CustomException(statusMessages.fa['500'], 500);
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  update(data: ArticleDto) {}

  async remove(id: string) {
    try {
      await this.articleRepository.delete(id);

      return {
        status: 204,
        message: statusMessages.fa['204'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
