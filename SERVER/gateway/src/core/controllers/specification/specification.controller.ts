import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { SpecificationDto } from './specification.dto';

@Controller('core/specification')
export class SpecificationController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: SpecificationDto) {
    return this.coreService.send('SPECIFICATION:CREATE', data);
  }

  @Get()
  findAll() {
    return this.coreService.send('SPECIFICATION:FIND');
  }
}
