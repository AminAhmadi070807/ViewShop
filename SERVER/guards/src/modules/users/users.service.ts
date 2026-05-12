import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto, CreateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CoreService } from '../../core/core.service';
import { statusMessages } from '../../common/messages/status.message';

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

  findOne(id: number) {}

  update(data: UpdateUserDto) {
    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
