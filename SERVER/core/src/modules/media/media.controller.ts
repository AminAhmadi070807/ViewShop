import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';

@Controller()
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @MessagePattern('MEDIA:SAVE')
  create(@Payload() createMediaDto: CreateMediaDto) {
    return this.mediaService.create(createMediaDto);
  }

  @MessagePattern('MEDIA:FIND')
  findAll() {
    return this.mediaService.findAll();
  }

  @MessagePattern('MEDIA:ONE')
  findOne(@Payload() id: number) {
    return this.mediaService.findOne(id);
  }

  @MessagePattern('MEDIA:DELETE')
  remove(@Payload() id: number) {
    return this.mediaService.remove(id);
  }
}
