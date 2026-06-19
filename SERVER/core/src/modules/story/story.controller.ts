import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StoryService } from './story.service';
import { StoryDto } from './dto/story.dto';

@Controller()
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @MessagePattern('STORY:CREATE')
  create(@Payload() createStoryDto: StoryDto) {
    return this.storyService.create(createStoryDto);
  }

  @MessagePattern('STORY:FIND:ALL')
  findAll() {
    return this.storyService.findAll();
  }

  @MessagePattern('STORY:FIND:STORE')
  findOne(@Payload() id: string) {
    return this.storyService.findOne(id);
  }

  @MessagePattern('STORY:DELETE')
  remove(@Payload() id: string) {
    return this.storyService.remove(id);
  }
}
