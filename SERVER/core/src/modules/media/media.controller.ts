import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MediaService } from './media.service';
import { MediaDto } from './dto/media.dto';

@Controller()
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @MessagePattern('MEDIA:SAVE')
  create(@Payload() data: MediaDto) {
    return this.mediaService.create(data);
  }

  @MessagePattern('MEDIA:FIND')
  findAll() {
    return this.mediaService.findAll();
  }

  @MessagePattern('MEDIA:SEARCH')
  search(@Payload() id: string) {
    return this.mediaService.search(id);
  }
}
