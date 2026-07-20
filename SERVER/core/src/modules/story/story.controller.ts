import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StoryService } from './story.service';
import { StoryDto } from './dto/story.dto';
import { ValidateUUID } from '../../common/validations/validate.dto';

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

  @MessagePattern('STORY:ONE')
  findStore(@Payload() data: ValidateUUID) {
    return this.storyService.findOne(data.id);
  }

  @MessagePattern('STORY:DELETE')
  remove(@Payload() data: ValidateUUID) {
    return this.storyService.remove(data.id);
  }
}
