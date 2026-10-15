import { Injectable } from '@nestjs/common';
import data from './object.data';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomException } from 'src/common/exceptions/custom.exception.error';
import { statusMessages } from 'src/common/messages/status.message';
import { Permission } from 'src/modules/permissions/entities/permission.entity';

@Injectable()
export class PermissionSeeder {
  constructor(
    @InjectRepository(Permission)
    private readonly repository: Repository<Permission>,
  ) {}

  async seeder() {
    try {
      const result = await this.repository.find();

      for (const permission of result) {
        await this.repository.delete(permission.id);
      }

      for (const detail of data) {
        const result = this.repository.create({
          title: detail.title,
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
