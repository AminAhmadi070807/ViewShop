import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StoryService } from './story.service';
import { StoryDto } from './dto/story.dto';
import { Validate } from '../../common/validations/validate.dto';
import { PageFilter } from '../../common/filters/page.filter';

@Controller()
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @MessagePattern('STORY:CREATE')
  create(@Payload() createStoryDto: StoryDto) {
    return this.storyService.create(createStoryDto);
  }

  @MessagePattern('STORY:FIND:ALL')
  findAll(@Payload() data: PageFilter) {
    return this.storyService.findAll(data.page);
  }

  @MessagePattern('STORY:ONE')
  findOne(@Payload() data: Validate) {
    return this.storyService.findOne(data.id);
  }

  @MessagePattern('STORY:ONE:LIKE')
  like(@Payload() data: Validate) {
    return this.storyService.findOne(data.id, true);
  }

  @MessagePattern('STORY:DELETE')
  remove(@Payload() data: Validate) {
    return this.storyService.remove(data.id);
  }
}
