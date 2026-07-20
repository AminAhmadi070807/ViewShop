import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidateUUID } from '../../common/validations/validate.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('USER:CREATE')
  async create(@Payload() data: CreateUserDto) {
    return await this.usersService.create(data);
  }

  @MessagePattern('USER:FIND')
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern('USER:ONE')
  findOne(@Payload() data: ValidateUUID) {
    return this.usersService.findOne(data);
  }

  @MessagePattern('USER:UPDATE')
  update(@Payload() data: UpdateUserDto) {
    return this.usersService.update(data);
  }
}
