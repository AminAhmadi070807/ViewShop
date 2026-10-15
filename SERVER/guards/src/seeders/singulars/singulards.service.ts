import data from './object.data';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';
import { Repository } from 'typeorm';
import { Singular } from '../../modules/singular/entities/singular.entity';

@Injectable()
export class SeedersSingularsService {
  constructor(
    @InjectRepository(Singular)
    private readonly repository: Repository<Singular>,
  ) {}

  async seeder() {
    try {
      const result = await this.repository.find();

      if (result.length) return;

      for (const detail of data) {
        const result = this.repository.create({
          id: detail.id,
          feature: { id: detail.feature },
          data: detail.data,
        });

        await this.repository.save(result);
      }
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
