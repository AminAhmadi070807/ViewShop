import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UpdateUserDto, CreateUserDto } from './dto/user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('USER:CREATE')
  create(@Payload() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @MessagePattern('USER:FIND')
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern('USER:ONE')
  findOne(@Payload() id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern('USER:UPDATE')
  update(@Payload() data: UpdateUserDto) {
    return this.usersService.update(data);
  }

  @MessagePattern('USER:VALIDATE')
  validate() {}
}
