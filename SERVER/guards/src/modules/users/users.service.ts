import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { statusMessages } from '../../common/messages/status.message';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { Role } from '../roles/entities/role.entity';
import { ValidateUUID } from '../../common/validations/id.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(data: ValidateUUID) {
    try {
      const existing = await this.userRepository.findOneBy({ id: data.id });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const numberOfUsers: number = await this.userRepository.count({});

      const role = await this.roleRepository.findOneBy({
        title: numberOfUsers ? 'USER' : 'ADMIN',
      });

      if (!role) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const newUser = this.userRepository.create({
        id: data.id,
        role: role,
      });

      const user = await this.userRepository.save(newUser);

      return { status: 201, message: statusMessages.fa['200'], body: user };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find({
        relations: ['role'],
        select: { role: { id: true, title: true } },
      });

      return { status: 200, message: statusMessages.fa['200'], body: users };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const user: User | null = await this.userRepository.findOne({
        where: {
          id,
        },
        relations: ['role'],
        select: {
          role: {
            id: true,
            title: true,
          },
        },
      });

      if (!user) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: HttpStatus.OK,
        message: statusMessages.fa['200'],
        data: user,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async updateRole(data: UpdateUserDto) {
    try {
      // find one user from database
      const user: User | null = await this.userRepository.findOne({
        where: {
          id: data.user,
        },
        relations: ['role'],
        select: {
          id: true,
          banned: true,
        },
      });

      // check user
      if (!user) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      // sava data in user & role
      await this.userRepository.save(user);

      return {
        status: HttpStatus.NO_CONTENT,
        message: statusMessages.fa['204'],
        data: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async toggleBanned(data: ValidateUUID) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: data.id },
      });

      if (!user) return new CustomException(statusMessages.fa['404'], 404);
      else if (user.role.title !== 'USER') {
        return {
          status: 409,
          message: 'فقط میتواند کاربر عادی را مسدود کنید',
          body: null,
        };
      }

      user.banned = !user.banned;

      await this.userRepository.save(user);

      return {
        status: HttpStatus.NO_CONTENT,
        message: statusMessages.fa['204'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.userRepository.delete(id);

      if (!result.affected)
        return new CustomException(statusMessages.fa['404'], 404);

      return { status: 204, message: statusMessages.fa['204'], data: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
