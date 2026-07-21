import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import bcrypt from 'bcrypt';
import { statusMessages } from '../../common/message/message.status';
import { Validate } from '../../common/validations/validate.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {
    try {
      const existing = await this.userRepository.findOneBy({
        phone: data.phone,
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const user = this.userRepository.create({
        phone: data.phone,
        password: bcrypt.hashSync(data.password, 12),
        fullName: data.fullName,
      });

      const saveUser = await this.userRepository.save(user);

      return {
        status: HttpStatus.CREATED,
        message: statusMessages.fa['201'],
        body: saveUser,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const user: User[] = await this.userRepository.find({
        order: {
          createdAt: 'DESC',
        },
        select: {
          id: true,
          fullName: true,
          phone: true,
          role: true,
        },
      });

      return {
        status: HttpStatus.OK,
        message: statusMessages.fa['200'],
        body: user,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(data: Validate) {
    try {
      if (data.id === data.user) {
        const user = await this.userRepository.findOneBy({ id: data.id });

        if (!user) return new CustomException(statusMessages.fa['404'], 404);

        return {
          status: HttpStatus.OK,
          message: statusMessages.fa['200'],
          body: user,
        };
      }

      return new CustomException(statusMessages.fa['403'], 403);
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async update(data: UpdateUserDto) {
    try {
      const existing = await this.userRepository.findOneBy({ id: data.id });

      if (!existing) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      if (existing.id !== data.user) {
        return new CustomException(statusMessages.fa['403'], 403);
      }

      existing.fullName = data.fullName;

      await this.userRepository.save(existing);

      return {
        status: HttpStatus.NO_CONTENT,
        message: statusMessages.fa['204'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
