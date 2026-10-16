import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import data from './object.data';
import { statusMessages } from '../../common/message/message.status';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { Color } from '../../modules/colors/entities/color.entity';

@Injectable()
export class MediaSeeder {
  constructor(
    @InjectRepository(Color)
    private readonly repository: Repository<Color>,
  ) {}

  async seeder() {
    try {
      for (const detail of data) {
        const exist = await this.repository.findOneBy({ id: detail.id });

        if (exist) continue;

        const result = this.repository.create({
          id: detail.id,
          title: detail.title,
          color: detail.color,
        });

        await this.repository.save(result);
      }

      return { status: 200, message: statusMessages.fa['200'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
