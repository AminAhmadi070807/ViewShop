import { Body, Controller, Post } from '@nestjs/common';
import { GuardsService } from '../../guards.service';
import { CreatePermissionDto } from './permission.dto';

@Controller('guards/permissions')
export class PermissionsController {
  constructor(private readonly guardsService: GuardsService) {}

  @Post()
  create(@Body() data: CreatePermissionDto) {
    return this.guardsService.send('PERMISSION:CREATE', data);
  }
}
