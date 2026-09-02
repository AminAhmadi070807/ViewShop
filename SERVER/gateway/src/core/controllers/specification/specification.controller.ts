import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { SpecificationDto } from './specification.dto';

@Controller('core/specification')
export class SpecificationController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: SpecificationDto) {
    return this.coreService.send('SPECIFICATION:CREATE', data);
  }
}
