import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  findOne(@Payload() id: string) {
    return this.usersService.findOne(id);
  }

  @MessagePattern('USER:PHONE')
  findByPhone(@Payload() phone: string) {
    return this.usersService.findByPhone(phone);
  }

  @MessagePattern('USER:UPDATE')
  update(@Payload() data: UpdateUserDto) {
    return this.usersService.update(data.id, data);
  }

  @MessagePattern('USER:DELETE')
  remove(@Payload() id: string) {
    return this.usersService.remove(id);
  }
}
