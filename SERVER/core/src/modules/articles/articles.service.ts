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
import { ArticleStatusEnum } from '../../common/enums/articles/articles.status';

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
      const store = await this.storeService.findOne({ id: data.store });
      const media = await this.mediaService.findId([data.cover]);

      if (category instanceof CustomException) return category;
      if (store instanceof CustomException) return store;
      if (media instanceof CustomException) return media;

      const existing = await this.articleRepository.findOneBy({
        title: data.title,
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const article = this.articleRepository.create({
        category: category.body,
        cover: media.body[0],
        store: store.body,
        title: data.title,
        description: data.description,
        author: { id: data.author },
        slug: data.slug,
        shortDescription: data.shortDescription,
      });

      await this.articleRepository.save(article);

      return { status: 201, message: statusMessages.fa['201'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll(page?: number) {
    try {
      const articles = await this.articleRepository.find({
        where: { status: ArticleStatusEnum.PUBLISHED },
        take: (page ?? 1) * 15,
        order: { createdAt: 'DESC' },
      });

      return { status: 200, message: statusMessages.fa['200'], body: articles };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const article = await this.articleRepository.findOneBy({ id });

      if (!article) return new CustomException(statusMessages.fa['404'], 404);

      return { status: 200, message: statusMessages.fa['200'], body: article };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async update(data: UpdateArticleDto) {
    try {
      const article = await this.articleRepository.update(
        { id: data.id, author: { id: data.author } },
        {
          cover: { id: data.cover },
          category: { id: data.category },
          title: data.title,
          description: data.description,
          slug: data.slug,
          shortDescription: data.shortDescription,
          status: ArticleStatusEnum.COMPLETION,
        },
      );

      if (!article.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return { status: 204, message: statusMessages.fa['204'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async updateStatus(data: UpdateArticleStatusDto) {
    try {
      const article = await this.articleRepository.update(data.id, {
        status: data.status,
        publishedAt: new Date().toISOString(),
      });

      if (!article.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return { status: 204, message: statusMessages.fa['204'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.articleRepository.delete(id);

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return { status: 204, message: statusMessages.fa['204'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
