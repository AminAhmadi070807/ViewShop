import { Body, Controller, Post } from '@nestjs/common';
import { GuardsService } from '../../guards.service';

@Controller('guards/permissions')
export class PermissionsController {
  constructor(private readonly guardsService: GuardsService) {}

  @Post()
  create(@Body() data: unknown) {
    return this.guardsService.send('PERMISSION:CREATE', data);
  }
}
