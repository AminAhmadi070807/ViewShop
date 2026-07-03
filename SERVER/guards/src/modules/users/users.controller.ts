import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UpdateUserDto, CreateUserDto } from './dto/user.dto';
import { ValidateUUID } from '../../common/validations/id.dto';

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
  findOne(@Payload() data: ValidateUUID) {
    return this.usersService.findOne(data.id);
  }

  @MessagePattern('USER:UPDATE:ROLE')
  updateRole(@Payload() data: UpdateUserDto) {
    return this.usersService.updateRole(data);
  }

  @MessagePattern('USER:TOGGLE:BANNED')
  toggleUserBanned(@Payload() data: ValidateUUID) {
    return this.usersService.toggleBanned(data);
  }
}
