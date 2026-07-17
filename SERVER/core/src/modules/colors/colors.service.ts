import { Injectable } from '@nestjs/common';
import { ColorDto } from './dto/color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { DeleteResult, ILike, In, Repository } from 'typeorm';
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

  async findAll() {
    try {
      const colors = await this.colorRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });

      return {
        status: 200,
        messages: statusMessages.fa['200'],
        body: colors,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const color = await this.colorRepository.findOneBy({ id });

      if (!color) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: color,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findByCode(colorsCode: string[]) {
    try {
      const colors: Color[] = await this.colorRepository.find({
        where: {
          color: In(colorsCode),
        },
      });

      if (!colors.length) {
        return new CustomException(statusMessages.fa['500'], 500);
      }

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: colors,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async search(title: string) {
    try {
      const colors: Color[] = await this.colorRepository.find({
        where: {
          color: ILike(`%${title}%`),
        },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: colors,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      const result: DeleteResult = await this.colorRepository.delete(id);

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return {
        status: 204,
        message: statusMessages.fa['204'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
