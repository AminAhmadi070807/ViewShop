import { Injectable } from '@nestjs/common';
import { StoryDto } from './dto/story.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story)
    private readonly storyRepository: Repository<Story>,
  ) {}

  create(data: StoryDto) {}

  findAll() {}

  findOne(id: string) {}

  remove(id: string) {}
}
