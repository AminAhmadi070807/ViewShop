import { Injectable } from '@nestjs/common';
import { StoryDto } from './dto/story.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { CategoriesService } from '../categories/category/categories.service';
import { MediaService } from '../media/media.service';
import { ProductService } from '../products/product.service';
import { WalletService } from '../wallet/wallet.service';
import { StoryStatusEnum } from '../../common/enums/story/status.enum';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story)
    private readonly storyRepository: Repository<Story>,
    private readonly categoryService: CategoriesService,
    private readonly mediaService: MediaService,
    private readonly productService: ProductService,
    private readonly walletService: WalletService,
  ) {}

  async create(data: StoryDto) {
    try {
      const category = await this.categoryService.findId([data.category]);
      const media = await this.mediaService.findId([data.video, data.banner]);
      const product = await this.productService.findOne(data.product);

      if (category instanceof CustomException) return category;
      if (media instanceof CustomException) return media;
      if (product instanceof CustomException) return product;

      const payment = await this.walletService.payment({
        user: data.user,
        amount: 1_000_000,
      });

      if (payment instanceof CustomException) return payment;

      const story = this.storyRepository.create({
        user: { id: data.user },
        category: category.body[0],
        banner: { id: data.banner },
        video: { id: data.video },
        title: data.title,
        product: { id: data.product },
      });

      await this.storyRepository.save(story);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: { id: story.id },
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll(page: number = 1, limit: number = 30) {
    try {
      const stories = await this.storyRepository.find({
        take: (page ?? 1) * limit,
        order: { createdAt: 'DESC' },
      });

      return { status: 200, body: stories, message: statusMessages.fa['200'] };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string, is_like: boolean = false) {
    try {
      const story = await this.storyRepository.findOneBy({ id });

      if (!story) return new CustomException(statusMessages.fa['404'], 404);
      story.view = story.view + 1;

      if (is_like) story.like = story.like + 1;

      await this.storyRepository.save(story);

      return { status: 200, message: statusMessages.fa['200'], body: story };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async payment(id: string, user: string) {
    try {
      const result = await this.storyRepository.findOneBy({ id });

      if (!result) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const payment = await this.walletService.payment({
        user,
        amount: 1_000_00,
      });

      if (payment instanceof CustomException) return payment;

      result.status = StoryStatusEnum.PENDING;

      await this.storyRepository.save(result);

      return { status: 204, message: statusMessages.fa['204'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async updateStatus(id: string) {
    try {
      const result = await this.storyRepository.findOneBy({ id });

      if (!result) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      result.status = StoryStatusEnum.PENDING;

      await this.storyRepository.save(result);

      return { status: 204, message: statusMessages.fa['204'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.storyRepository.delete(id);

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return { status: 204, message: statusMessages.fa['204'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
