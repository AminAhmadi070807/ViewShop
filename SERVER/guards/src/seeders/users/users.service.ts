import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomException } from 'src/common/exceptions/custom.exception.error';
import { statusMessages } from 'src/common/messages/status.message';
import { User } from 'src/modules/users/entities/user.entity';
import data from './object.data';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  async seeder() {
    try {
      const result = await this.repository.find();

      if (result.length) return;

      for (const detail of data) {
        const result = this.repository.create({
          id: detail.id,
          role: { id: detail.role },
        });

        await this.repository.save(result);
      }

      return { status: 200, message: statusMessages.fa[200], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
