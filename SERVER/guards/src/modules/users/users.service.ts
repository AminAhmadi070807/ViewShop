import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UsersService {
  create(data: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(data: CreateUserDto) {
    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
