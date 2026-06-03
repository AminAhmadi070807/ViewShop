import { Injectable } from '@nestjs/common';
import { MediaDto } from './dto/media.dto';

@Injectable()
export class MediaService {
  create(data: MediaDto) {
    return 'This action adds a new media';
  }

  findAll() {
    return `This action returns all media`;
  }

  search(id: string) {
    return `This action returns a #${id} media`;
  }

  remove(id: string) {
    return `This action removes a #${id} media`;
  }
}
