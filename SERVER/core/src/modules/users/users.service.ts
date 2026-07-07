import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
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
          id: -1,
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
        body: user,
        message: statusMessages.fa['200'],
      };
    } catch (error) {
      const err = error as Error;
      throw new CustomException(
        `Internal server error. error message: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // get one user by id
  async findOne(id: string) {
    const user: User | null = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new CustomException(statusMessages.fa['404'], 404);

    return {
      status: HttpStatus.OK,
      body: user,
      message: statusMessages.fa['200'],
    };
  }

  // get one user by phone number
  async findByPhone(phone: string) {
    // find one user by phone number
    const user: User | null = await this.userRepository.findOne({
      where: {
        phone: phone,
      },
    });

    // send error to client
    if (!user) throw new CustomException(statusMessages.fa['404'], 404);

    return {
      status: 200,
      message: statusMessages.fa['204'],
      body: user,
    };
  }

  // update user information
  async update(id: string, data: UpdateUserDto) {
    try {
      await this.userRepository.update(id, data);

      return {
        status: HttpStatus.OK,
        message: 'User updated successfully.',
        body: null,
      };
    } catch (error) {
      const err = error as Error;
      throw new CustomException(
        `Internal server error. error message: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // remove user by id
  async remove(id: string) {
    try {
      await this.userRepository.delete(id);

      return {
        body: null,
        status: HttpStatus.NO_CONTENT,
        message: 'User removed successfully.',
      };
    } catch (error) {
      const err = error as Error;
      throw new CustomException(
        `Internal server error. error message: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
