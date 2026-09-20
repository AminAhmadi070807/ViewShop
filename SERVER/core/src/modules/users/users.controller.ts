import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Validate } from '../../common/validations/validate.dto';
import { PageFilter } from '../../common/filters/page.filter';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('USER:CREATE')
  async create(@Payload() data: CreateUserDto) {
    return await this.usersService.create(data);
  }

  @MessagePattern('USER:FIND')
  findAll(@Payload() data: PageFilter) {
    return this.usersService.findAll(data.page);
  }

  @MessagePattern('USER:ONE')
  findOne(@Payload() data: Validate) {
    return this.usersService.findOne(data);
  }

  @MessagePattern('USER:UPDATE')
  update(@Payload() data: UpdateUserDto) {
    return this.usersService.update(data);
  }

  @MessagePattern('USER:DELETE')
  remove(@Payload() data: Validate) {
    return this.usersService.remove(data);
  }
}
