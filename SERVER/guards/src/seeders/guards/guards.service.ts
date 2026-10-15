import { Injectable } from '@nestjs/common';
import data from './object.data';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomException } from 'src/common/exceptions/custom.exception.error';
import { statusMessages } from 'src/common/messages/status.message';
import { Guard } from 'src/modules/guards/entities/guard.entity';

@Injectable()
export class GuardsSeeder {
  constructor(
    @InjectRepository(Guard) private readonly repository: Repository<Guard>,
  ) {}

  async seeder() {
    try {
      const result = await this.repository.find();

      for (const detail of result) {
        await this.repository.delete(detail.id);
      }

      // for (const detail of data) {
      //   const result = this.repository.create({});
      // }
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
