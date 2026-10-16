import data from './object.data';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from '../../modules/features/entities/feature.entity';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';
import { Repository } from 'typeorm';

@Injectable()
export class FeaturesSeeder {
  constructor(
    @InjectRepository(Feature) private readonly repository: Repository<Feature>,
  ) {}

  async seeder() {
    try {
      for (const detail of data) {
        const exist = await this.repository.findOneBy({ id: detail.id });

        if (exist) continue;

        const result = this.repository.create({
          id: detail.id,
          title: detail.title,
          roles: detail.roles.map((id) => {
            return { id };
          }),
        });

        await this.repository.save(result);
      }
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
