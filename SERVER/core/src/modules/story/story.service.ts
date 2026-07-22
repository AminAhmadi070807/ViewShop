import { Injectable } from '@nestjs/common';
import { StoryDto } from './dto/story.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { CategoriesService } from '../categories/category/categories.service';
import { MediaService } from '../media/media.service';
import { RpcException } from '@nestjs/microservices';
import { Validate } from '../../common/validations/validate.dto';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story)
    private readonly storyRepository: Repository<Story>,
    private readonly categoryService: CategoriesService,
    private readonly mediaService: MediaService,
  ) {}

  async create(data: StoryDto) {
    try {
      const category = await this.categoryService.findId([data.category]);
      const media = await this.mediaService.findId([data.video, data.banner]);

      if (category instanceof RpcException || media instanceof RpcException) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const story: Story = this.storyRepository.create({
        user: {
          id: data.user,
        },
        category: category.body[0],
        banner: {
          id: data.banner,
        },
        video: {
          id: data.video,
        },
        title: data.title,
        link: data.link,
      });

      const newStory = await this.storyRepository.save(story);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: {
          id: newStory.id,
        },
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll(page: number = 1) {
    try {
      const stories: Story[] = await this.storyRepository.find({
        take: (page ?? 1) * 15,
        order: { createdAt: 'DESC' },
      });

      return {
        status: 200,
        body: stories,
        message: statusMessages.fa['200'],
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const story: Story | null = await this.storyRepository.findOneBy({ id });

      if (!story) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: story,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(data: Validate) {
    try {
      const result: DeleteResult = await this.storyRepository.delete({
        id: data.id,
        user: { id: data.user },
      });

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

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
