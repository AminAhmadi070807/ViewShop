import { Injectable } from '@nestjs/common';
import { MediaDto } from './dto/media.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  async create(data: MediaDto) {
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
