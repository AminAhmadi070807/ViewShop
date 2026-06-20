import { Injectable } from '@nestjs/common';
import {
  ArticleDto,
  UpdateArticleDto,
  UpdateArticleStatusDto,
} from './dto/article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { CategoriesService } from '../categories/category/categories.service';
import { StoreService } from '../store/store.service';
import { MediaService } from '../media/media.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly categoryService: CategoriesService,
    private readonly storeService: StoreService,
    private readonly mediaService: MediaService,
  ) {}

  async create(data: ArticleDto) {
    try {
      const category = await this.categoryService.findOne(data.category);
      const store = await this.storeService.findOne(data.store);
      const media = await this.mediaService.findId([data.cover]);

      if (
        category instanceof RpcException ||
        store instanceof RpcException ||
        media instanceof RpcException
      ) {
        return new CustomException(statusMessages.fa['500'], 500);
      }

      const article: Article = this.articleRepository.create({
        category: category.body,
        cover: media.body[0],
        store: store.body,
      });

      const newArticle = await this.articleRepository.save(article);

      return {
        status: 201,
        body: {
          id: newArticle.id,
        },
        message: statusMessages.fa['201'],
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

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

  async update(data: UpdateArticleDto) {
    try {
      const article: Article | null = await this.articleRepository.findOneBy({
        id: data.id,
      });

      if (!article) return new CustomException(statusMessages.fa['404'], 404);

      await this.articleRepository.update(data.id, {
        cover: {
          id: data.cover,
        },
        category: {
          id: data.category,
        },
        title: data.title,
        description: data.description,
        slug: data.slug,
      });

      return {
        status: 204,
        body: null,
        message: statusMessages.fa['204'],
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async updateStatus(data: UpdateArticleStatusDto) {
    try {
      const article: Article | null = await this.articleRepository.findOneBy({
        id: data.id,
        status: data.status,
      });

      if (!article) return new CustomException(statusMessages.fa['500'], 500);

      return {
        status: 204,
        message: statusMessages.fa['204'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

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
