import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PermissionsService } from './permissions.service';
import { UpdatePermissionDto, CreatePermissionDto } from './dto/permission.dto';

@Controller()
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @MessagePattern('PERMISSION:CREATE')
  create(@Payload() data: CreatePermissionDto) {
    return this.permissionsService.create(data);
  }

  @MessagePattern('findAllPermissions')
  findAll() {
    return this.permissionsService.findAll();
  }

  @MessagePattern('findOnePermission')
  findOne(@Payload() id: number) {
    return this.permissionsService.findOne(id);
  }

  @MessagePattern('updatePermission')
  update(@Payload() data: UpdatePermissionDto) {
    return this.permissionsService.update(data.id, data);
  }

  @MessagePattern('removePermission')
  remove(@Payload() id: number) {
    return this.permissionsService.remove(id);
  }
}
