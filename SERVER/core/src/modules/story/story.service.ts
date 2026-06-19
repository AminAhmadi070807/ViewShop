import { Injectable } from '@nestjs/common';
import { StoryDto } from './dto/story.dto';

@Injectable()
export class StoryService {
  create(createStoryDto: StoryDto) {
    return 'This action adds a new story';
  }

  findAll() {
    return `This action returns all story`;
  }

  findOne(id: number) {
    return `This action returns a #${id} story`;
  }

  remove(id: number) {
    return `This action removes a #${id} story`;
  }
}
