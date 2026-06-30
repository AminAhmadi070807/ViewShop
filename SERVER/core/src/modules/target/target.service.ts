import { Injectable } from '@nestjs/common';
import { TargetDto } from './dto/target.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Target } from './entities/target.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class TargetService {
  constructor(
    @InjectRepository(Target)
    private readonly targetRepository: Repository<Target>,
  ) {}

  async create(data: TargetDto) {
    try {
      const existing: Target | null = await this.targetRepository.findOneBy({
        title: data.title.trim(),
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const target: Target = this.targetRepository.create(data);

      await this.targetRepository.save(target);

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
      const result: TargetDto[] = await this.targetRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: result,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  findOne(id: string) {}

  update(data: TargetDto) {}

  remove(id: string) {}
}
