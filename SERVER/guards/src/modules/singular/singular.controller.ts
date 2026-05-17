import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SingularService } from './singular.service';
import {
  SingularDto,
  UpdateSingularDto,
  UpdateSingularRoleDto,
} from './dto/singular.dto';
import { ValidateUUID } from '../../common/validations/id.dto';

@Controller()
export class SingularController {
  constructor(private readonly singularService: SingularService) {}

  @MessagePattern('SINGULAR:CREATE')
  create(@Payload() data: SingularDto) {
    return this.singularService.create(data);
  }

  @MessagePattern('SINGULAR:FIND')
  findAll() {
    return this.singularService.findAll();
  }

  @MessagePattern('SINGULAR:TOGGLE:PERMISSION')
  togglePermission(@Payload() data: UpdateSingularDto) {
    return this.singularService.togglePermission(data);
  }

  @MessagePattern('SINGULAR:TOGGLE:ROLE')
  toggleRole(@Payload() data: UpdateSingularRoleDto) {
    return this.singularService.toggleRole(data);
  }

  @MessagePattern('SINGULAR:DELETE')
  remove(@Payload() data: ValidateUUID) {
    return this.singularService.remove(data);
  }
}
