import { Injectable } from '@nestjs/common';
import data from './object.data';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomException } from 'src/common/exceptions/custom.exception.error';
import { statusMessages } from 'src/common/messages/status.message';
import { Guard } from 'src/modules/guards/entities/guard.entity';
import { GuardEnum, MethodEnum } from '../../common/enums/guards/guard.enum';

@Injectable()
export class GuardsSeeder {
  constructor(
    @InjectRepository(Guard) private readonly repository: Repository<Guard>,
  ) {}

  async seeder() {
    try {
      const result = await this.repository.find();

      if (result.length) return;

      for (const detail of data) {
        const result = this.repository.create({
          id: detail.id,
          permission: { id: detail.permission },
          method: detail.method as MethodEnum,
          public: detail.public,
          service: detail.service as GuardEnum,
          feature: { id: detail.feature },
        });

        await this.repository.save(result);
      }
    } catch (error) {
      console.log(error);
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
