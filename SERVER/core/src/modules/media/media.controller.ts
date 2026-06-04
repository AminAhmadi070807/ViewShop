import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MediaService } from './media.service';
import { MediaDto } from './dto/media.dto';
import { ValidateTitle } from '../../common/validations/title.dto';

@Controller()
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @MessagePattern('MEDIA:UPLOAD')
  create(@Payload() data: MediaDto) {
    return this.mediaService.create(data);
  }

  @MessagePattern('MEDIA:FIND')
  findAll() {
    return this.mediaService.findAll();
  }

  @MessagePattern('MEDIA:SEARCH')
  search(@Payload() data: ValidateTitle) {
    return this.mediaService.search(data.title);
  }
}
