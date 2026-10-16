import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import data from './object.data';
import { Media } from '../../modules/media/entities/media.entity';
import { statusMessages } from '../../common/message/message.status';
import { CustomException } from '../../common/exceptions/custom.exception.error';

@Injectable()
export class MediaSeeder {
  constructor(
    @InjectRepository(Media)
    private readonly repository: Repository<Media>,
  ) {}

  async seeder() {
    try {
      const result = await this.repository.find({});

      if (result.length) return;

      for (const detail of data) {
        const result = this.repository.create({
          id: detail.id,
          path: detail.path,
          title: detail.title,
          type: detail.type,
        });

        await this.repository.save(result);
      }

      return { status: 200, message: statusMessages.fa['200'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
