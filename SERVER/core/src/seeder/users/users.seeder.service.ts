import { Injectable } from '@nestjs/common';
import data from './object.data';
import { statusMessages } from '../../common/message/message.status';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../modules/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersSeeder {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async seeder() {
    try {
      for (const detail of data) {
        const exist = await this.repository.findOneBy({ id: detail.id });

        if (exist) continue;

        const result = this.repository.create({
          id: detail.id,
          fullName: detail.fullName,
          password: bcrypt.hashSync(detail.password, 12),
          phone: detail.phone,
        });

        await this.repository.save(result);
      }

      return { status: 200, message: statusMessages.fa['200'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
