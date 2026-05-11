import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/permission.dto';
import { ValidateUUID } from '../../common/validations/id.dto';

@Controller()
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @MessagePattern('PERMISSION:CREATE')
  create(@Payload() data: CreatePermissionDto) {
    return this.permissionsService.create(data);
  }

  @MessagePattern('PERMISSION:FIND')
  findAll() {
    return this.permissionsService.findAll();
  }

  @MessagePattern('PERMISSION:ONE')
  findOne(@Payload() data: ValidateUUID) {
    return this.permissionsService.findOne(data.id);
  }

  @MessagePattern('PERMISSION:DELETE')
  remove(@Payload() data: ValidateUUID) {
    return this.permissionsService.remove(data.id);
  }
}
