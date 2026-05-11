import { Injectable } from '@nestjs/common';
import { UpdateUserDto, CreateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CoreService } from '../../core/core.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly coreService: CoreService,
  ) {}

  async create(data: CreateUserDto) {}

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(data: UpdateUserDto) {
    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
