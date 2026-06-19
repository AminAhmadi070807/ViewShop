import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';

@Controller()
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @MessagePattern('createStory')
  create(@Payload() createStoryDto: CreateStoryDto) {
    return this.storyService.create(createStoryDto);
  }

  @MessagePattern('findAllStory')
  findAll() {
    return this.storyService.findAll();
  }

  @MessagePattern('findOneStory')
  findOne(@Payload() id: number) {
    return this.storyService.findOne(id);
  }

  @MessagePattern('updateStory')
  update(@Payload() updateStoryDto: UpdateStoryDto) {
    return this.storyService.update(updateStoryDto.id, updateStoryDto);
  }

  @MessagePattern('removeStory')
  remove(@Payload() id: number) {
    return this.storyService.remove(id);
  }
}
