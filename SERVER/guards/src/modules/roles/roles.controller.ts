import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RolesService } from './roles.service';
import { ValidateUUID } from '../../common/validations/id.dto';
import { RolesDto, UpdateRolesDto } from './dto/roles.dto';

@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern('ROLE:CREATE')
  create(@Payload() data: RolesDto) {
    return this.rolesService.create(data);
  }

  @MessagePattern('ROLE:FIND')
  findAll() {
    return this.rolesService.findAll();
  }

  @MessagePattern('ROLE:ONE')
  findOne(@Payload() data: ValidateUUID) {
    return this.rolesService.findOne(data.id);
  }

  @MessagePattern('ROLE:UPDATE')
  update(@Payload() data: UpdateRolesDto) {
    return this.rolesService.update(data);
  }

  @MessagePattern('ROLE:DELETE')
  remove(@Payload() data: ValidateUUID) {
    return this.rolesService.remove(data.id);
  }
}
