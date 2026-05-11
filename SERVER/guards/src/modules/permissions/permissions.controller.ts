import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller()
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @MessagePattern('createPermission')
  create(@Payload() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
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
  update(@Payload() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.update(updatePermissionDto.id, updatePermissionDto);
  }

  @MessagePattern('removePermission')
  remove(@Payload() id: number) {
    return this.permissionsService.remove(id);
  }
}
