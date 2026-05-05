import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    data: CreateUserDto,
  ): Promise<{ status: HttpStatus; message: string }> {
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

    const user: User = this.userRepository.create({
      phone: data.phone,
      password: hashedPassword,
      fullName: data.fullName,
    });

    await this.userRepository.save(user);

    return {
      status: HttpStatus.CREATED,
      message: 'User created successfully.',
    };
  }

  async findAll(): Promise<{ status: HttpStatus; body: User[] }> {
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
      };
    } catch (error) {
      throw new CustomException(
        error.message as string,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
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
    };
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      await this.userRepository.update(id, data);

      return {
        status: HttpStatus.OK,
        message: 'User updated successfully.',
      };
    } catch (error) {
      throw new CustomException(
        error.message as string,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      await this.userRepository.delete(id);

      return {
        status: HttpStatus.NO_CONTENT,
        message: 'User removed successfully.',
      };
    } catch (error) {
      throw new CustomException(
        error.message as string,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
