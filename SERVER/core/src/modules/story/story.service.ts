import { Injectable } from '@nestjs/common';
import { StoryDto } from './dto/story.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story)
    private readonly storyRepository: Repository<Story>,
  ) {}

  create(data: StoryDto) {}

  async findAll() {
    try {
      const stories: Story[] = await this.storyRepository.find({
        order: {
          createdAt: 'DESC',
        },
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

  async findOne(alias: string) {
    try {
      const story: Story | null = await this.storyRepository.findOneBy({
        alias,
      });

      if (!story) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: statusMessages.fa['200'],
        body: story,
        message: statusMessages.fa['200'],
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      await this.storyRepository.delete(id);

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
