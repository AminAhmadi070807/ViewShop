import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/user.dto';
import { ValidateUUID } from '../../common/validations/id.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('USER:CREATE')
  create(@Payload() data: { id: string; is_test: boolean }) {
    return this.usersService.create(data.id, data.is_test);
  }

  @MessagePattern('USER:FIND')
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern('USER:ONE')
  findOne(@Payload() data: ValidateUUID) {
    return this.usersService.findOne(data.id);
  }

  @MessagePattern('USER:TOGGLE:ROLE')
  updateRole(@Payload() data: UpdateUserDto) {
    return this.usersService.updateRole(data);
  }

  @MessagePattern('USER:TOGGLE:BANNED')
  toggleUserBanned(@Payload() data: ValidateUUID) {
    return this.usersService.toggleBanned(data);
  }

  @MessagePattern('USER:DELETE')
  remove(@Payload() data: ValidateUUID) {
    return this.usersService.remove(data.id);
  }
}
