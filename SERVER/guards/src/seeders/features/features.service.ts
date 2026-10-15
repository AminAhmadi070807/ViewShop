import { Injectable } from '@nestjs/common';
import data from './object.data';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from 'src/modules/features/entities/feature.entity';
import { Repository } from 'typeorm';
import { CustomException } from 'src/common/exceptions/custom.exception.error';
import { statusMessages } from 'src/common/messages/status.message';

@Injectable()
export class FeaturesSeeder {
  constructor(
    @InjectRepository(Feature) private readonly repository: Repository<Feature>,
  ) {}

  async seeder() {
    try {
      const result = await this.repository.find();

      if (result.length) return;

      for (const detail of data) {
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
