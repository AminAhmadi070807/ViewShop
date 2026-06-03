import { Injectable } from '@nestjs/common';
import { MediaDto } from './dto/media.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  async create(data: MediaDto) {
    try {
      const existing = await this.mediaRepository.findOneBy({
        path: data.path,
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const media: Media = this.mediaRepository.create({
        path: data.path,
        user: {
          id: data.user,
        },
        title: data.title,
      });

      const save: Media = await this.mediaRepository.save(media);

      return {
        statusCode: 200,
        data: media,
        body: {
          id: save.id,
        },
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
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
