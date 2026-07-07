import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import bcrypt from 'bcrypt';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // create new user
  async create(data: CreateUserDto) {
    try {
      // existing user
      const existing: User | null = await this.userRepository.findOne({
        where: { phone: data.phone },
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      // create new user
      const user = this.userRepository.create({
        phone: data.phone,
        password: bcrypt.hashSync(data.password, 12),
        fullName: data.fullName,
      });

      // save user in database
      const saveUser = await this.userRepository.save(user);

      // send response to client
      return {
        status: HttpStatus.CREATED,
        message: statusMessages.fa['201'],
        body: saveUser,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  // getting all users
  async findAll() {
    try {
      // get all user from database
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

      // send response to client
      return {
        status: HttpStatus.OK,
        message: statusMessages.fa['200'],
        body: user,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  // get one user by id
  async findOne(id: string) {
    try {
      const user: User | null = await this.userRepository.findOneBy({ id });

      if (!user) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: HttpStatus.OK,
        message: statusMessages.fa['200'],
        body: user,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  // get one user by phone number
  async findByPhone(phone: string) {
    try {
      // find one user by phone number
      const user: User | null = await this.userRepository.findOneBy({
        phone: phone,
      });

      // send error to client
      if (!user) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: 200,
        message: statusMessages.fa['204'],
        body: user,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  // update user information
  async update(id: string, data: UpdateUserDto) {
    try {
      const result: UpdateResult = await this.userRepository.update(id, data);

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return {
        status: HttpStatus.OK,
        message: 'User updated successfully.',
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  // remove user by id
  async remove(id: string) {
    try {
      const result = await this.userRepository.delete(id);

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

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
