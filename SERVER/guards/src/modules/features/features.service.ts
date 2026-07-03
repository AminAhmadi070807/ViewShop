import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';
import { Repository } from 'typeorm';
import { ValidateTitle } from '../../common/validations/title.dto';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
  ) {}

  async create(data: ValidateTitle) {
    try {
      const existing: Feature | null = await this.featureRepository.findOneBy({
        title: data.title,
      });

      if (!existing) return new CustomException(statusMessages.fa['409'], 409);

      const result: Feature = this.featureRepository.create({
        title: data.title,
      });

      await this.featureRepository.save(result);

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
      const result: Feature[] = await this.featureRepository.find({
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

  async findOne(id: string) {
    try {
      const result: Feature | null = await this.featureRepository.findOneBy({
        id,
      });

      if (!result) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: result,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  update(data: ValidateTitle) {}

  remove(id: string) {}
}
