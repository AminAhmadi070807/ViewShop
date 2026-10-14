import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomException } from 'src/common/exceptions/custom.exception.error';
import { statusMessages } from 'src/common/messages/status.message';
import data from './object.data';
import { Role } from 'src/modules/roles/entities/role.entity';

@Injectable()
export class RoleSeeder {
  constructor(
    @InjectRepository(Role) private readonly repository: Repository<Role>,
  ) {}

  async seeder() {
    try {
      const result = await this.repository.find();

      for (const role of result) {
        await this.repository.delete(role.id);
      }

      for (const detail of data) {
        const result = this.repository.create({
          title: detail.title,
          description: detail.description,
          id: detail.id,
        });

        await this.repository.save(result);
      }

      return { status: 200, message: statusMessages.fa[200], body: null };
    } catch (error) {
      console.log(error);
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
