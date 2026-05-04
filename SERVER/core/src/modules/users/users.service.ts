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
    const user: User[] = await this.userRepository.find({
      order: {
        id: -1,
      },
    });

    return {
      status: HttpStatus.OK,
      body: user,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: string, data: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
