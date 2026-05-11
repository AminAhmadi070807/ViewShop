import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GuardsService } from '../../guards.service';
import { CreatePermissionDto, PermissionUUID } from './permission.dto';

@Controller('guards/permissions')
export class PermissionsController {
  constructor(private readonly guardsService: GuardsService) {}

  @Post()
  create(@Body() data: CreatePermissionDto) {
    return this.guardsService.send('PERMISSION:CREATE', data);
  }

  @Get()
  findAll() {
    return this.guardsService.send('PERMISSION:FIND');
  }

  @Get(':id')
  findOne(@Param() data: PermissionUUID) {
    return this.guardsService.send('PERMISSION:ONE', data.id);
  }

  @Delete(':id')
  remove(@Param() data: PermissionUUID) {
    return this.guardsService.send('PERMISSION:REMOVE', data.id);
  }
}
