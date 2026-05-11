import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/permission.dto';

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
  findOne(@Payload() id: string) {
    return this.permissionsService.findOne(id);
  }

  @MessagePattern('PERMISSION:DELETE')
  remove(@Payload() id: string) {
    return this.permissionsService.remove(id);
  }
}
