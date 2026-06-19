import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';

@Controller()
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @MessagePattern('STORY:CREATE')
  create(@Payload() createStoryDto: CreateStoryDto) {
    return this.storyService.create(createStoryDto);
  }

  @MessagePattern('STORY:FIND:ALL')
  findAll() {
    return this.storyService.findAll();
  }

  @MessagePattern('STORY:FIND:STORE')
  findOne(@Payload() id: number) {
    return this.storyService.findOne(id);
  }

  @MessagePattern('STORY:DELETE')
  remove(@Payload() id: number) {
    return this.storyService.remove(id);
  }
}
