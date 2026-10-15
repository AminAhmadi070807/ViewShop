import data from './object.data';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';
import { Repository } from 'typeorm';
import { Role } from '../../modules/roles/entities/role.entity';

@Injectable()
export class RoleSeeder {
  constructor(
    @InjectRepository(Role) private readonly repository: Repository<Role>,
  ) {}

  async seeder() {
    try {
      const result = await this.repository.find();

      if (result.length) return;

      for (const detail of data) {
        const result = this.repository.create({
          title: detail.title,
          description: detail.description,
          id: detail.id,
        });

        await this.repository.save(result);
      }

      return { status: 200, message: statusMessages.fa[200], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
