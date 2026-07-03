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

  findAll() {}

  findOne(id: string) {}

  update(data: ValidateTitle) {}

  remove(id: string) {}
}
