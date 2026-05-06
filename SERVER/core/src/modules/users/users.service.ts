import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import bcrypt from 'bcrypt';
import { UserInterface } from '../../common/interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<UserInterface> {
    const existing: User | null = await this.userRepository.findOne({
      where: { phone: data.phone },
    });

    if (existing) {
      throw new CustomException(
        'this phone number already registered.',
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword: string = bcrypt.hashSync(data.password, 12);

    try {
      const user: User = this.userRepository.create({
        phone: data.phone,
        password: hashedPassword,
        fullName: data.fullName,
      });

      const saveUser: User = await this.userRepository.save(user);

      return {
        status: HttpStatus.CREATED,
        message: 'User created successfully.',
        body: saveUser,
      };
    } catch (error) {
      const err = error as Error;
      throw new CustomException(
        `Internal server error. error message: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<UserInterface> {
    try {
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

      return {
        status: HttpStatus.OK,
        body: user,
        message: null,
      };
    } catch (error) {
      const err = error as Error;
      throw new CustomException(
        `Internal server error. error message: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<UserInterface> {
    const user: User | null = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new CustomException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      status: HttpStatus.OK,
      body: user,
      message: null,
    };
  }

  async findByPhone(phone: string): Promise<UserInterface> {
    const user: User | null = await this.userRepository.findOne({
      where: {
        phone: phone,
      },
    });

    if (!user) {
      throw new CustomException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      status: 200,
      message: null,
      body: user,
    };
  }

  async update(id: string, data: UpdateUserDto): Promise<UserInterface> {
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

  async remove(id: string): Promise<UserInterface> {
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
