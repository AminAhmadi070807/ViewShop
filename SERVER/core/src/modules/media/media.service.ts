import { Injectable } from '@nestjs/common';
import { MediaDto } from './dto/media.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { ILike, In, Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { MediaTypeEnum } from '../../common/enums/media/media.enum';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  async create(data: MediaDto) {
    try {
      const media: Media = this.mediaRepository.create({
        path: data.path,
        user: {
          id: data.user,
        },
        title: data.title,
        type: data.type,
      });

      const save: Media = await this.mediaRepository.save(media);

      return {
        status: 200,
        message: statusMessages.fa['201'],
        body: {
          id: save.id,
        },
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll(page: number = 1) {
    try {
      const medias: Media[] = await this.mediaRepository.find({
        take: (page ?? 1) * 15,
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: medias,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findId(id: string[]) {
    try {
      const medias: Media[] = await this.mediaRepository.find({
        where: {
          id: In(id),
        },
      });

      if (!medias.length) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: medias,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async search(title: string) {
    try {
      const medias: Media[] = await this.mediaRepository.find({
        where: {
          title: ILike(`%${title}%`),
          type: MediaTypeEnum.PUBLIC,
        },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: medias,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
