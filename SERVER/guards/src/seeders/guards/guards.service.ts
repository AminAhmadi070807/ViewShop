import data from './object.data';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';
import { Repository } from 'typeorm';
import { GuardEnum, MethodEnum } from '../../common/enums/guards/guard.enum';
import { Guard } from '../../modules/guards/entities/guard.entity';

@Injectable()
export class GuardsSeeder {
  constructor(
    @InjectRepository(Guard) private readonly repository: Repository<Guard>,
  ) {}

  async seeder() {
    try {
      for (const detail of data) {
        const exist = await this.repository.findOneBy({ id: detail.id });

        if (exist) continue;

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
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
