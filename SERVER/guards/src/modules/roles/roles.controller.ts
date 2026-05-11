import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RolesService } from './roles.service';
import { UpdateRoleDto, CreateRoleDto } from './dto/role.dto';

@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern('ROLE:CREATE')
  create(@Payload() data: CreateRoleDto) {
    return this.rolesService.create(data);
  }

  @MessagePattern('ROLE:FIND')
  findAll() {
    return this.rolesService.findAll();
  }

  @MessagePattern('ROLE:ONE')
  findOne(@Payload() id: number) {
    return this.rolesService.findOne(id);
  }

  @MessagePattern('ROLE:UPDATE')
  update(@Payload() data: UpdateRoleDto) {
    return this.rolesService.update(data.id, data);
  }

  @MessagePattern('ROLE:DELETE')
  remove(@Payload() id: number) {
    return this.rolesService.remove(id);
  }
}
