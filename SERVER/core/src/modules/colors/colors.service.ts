import { Injectable } from '@nestjs/common';
import { ColorDto } from './dto/color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  async create(data: ColorDto) {
    try {
      const existing = await this.colorRepository.findOneBy([
        { color: data.color },
        { title: data.title },
      ]);

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const color = this.colorRepository.create({
        color: data.color,
        title: data.title,
        ...(data.media && {
          media: {
            id: data.media,
          },
        }),
      });

      await this.colorRepository.save(color);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  findAll() {}

  findOne(id: string) {}

  update(data: ColorDto) {}

  remove(id: string) {}
}
