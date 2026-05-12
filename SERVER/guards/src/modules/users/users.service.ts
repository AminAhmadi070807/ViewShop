import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto, CreateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CoreService } from '../../core/core.service';
import { statusMessages } from '../../common/messages/status.message';
import { CustomException } from '../../common/exceptions/custom.exception.error';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly coreService: CoreService,
  ) {}

  async create(data: CreateUserDto) {}

  async findAll() {
    const users: User[] = await this.userRepository.find({
      relations: ['roles'],
    });

    return {
      status: HttpStatus.OK,
      message: statusMessages.fa['201'],
      data: users,
    };
  }

  async findOne(id: string) {
    const user: User | null = await this.userRepository.findOneBy({ id });

    if (!user) throw new CustomException(statusMessages.fa['404'], 404);

    return {
      status: HttpStatus.OK,
      message: statusMessages.fa['200'],
      data: user,
    };
  }

  update(data: UpdateUserDto) {
    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
