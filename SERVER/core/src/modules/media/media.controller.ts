import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MediaService } from './media.service';
import { MediaDto } from './dto/media.dto';
import { ValidateTitle } from '../../common/validations/title.dto';
import { PageFilter } from '../../common/filters/page.filter';

@Controller()
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @MessagePattern('MEDIA:UPLOAD')
  create(@Payload() data: MediaDto) {
    return this.mediaService.create(data);
  }

  @MessagePattern('MEDIA:FIND')
  findAll(@Payload() data: PageFilter) {
    return this.mediaService.findAll(data.page);
  }

  @MessagePattern('MEDIA:SEARCH')
  search(@Payload() data: ValidateTitle) {
    return this.mediaService.search(data.title);
  }
}
