import { Injectable } from '@nestjs/common';
import data from './object.data';
import { statusMessages } from '../../common/message/message.status';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import bcrypt from 'bcrypt';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class UsersSeeder {
  constructor(private readonly service: UsersService) {}

  async seeder() {
    try {
      for (const detail of data) {
        const exist = await this.service.findOne({ id: detail.id });

        if (exist instanceof CustomException) {
          await this.service.create({
            id: detail.id,
            fullName: detail.fullName,
            password: bcrypt.hashSync(detail.password, 12),
            phone: detail.phone,
            role: detail.role,
          });
        }
      }

      return { status: 200, message: statusMessages.fa['200'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
