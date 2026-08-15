import { Controller, Get } from '@nestjs/common';
import { CoreService } from '../../core.service';

@Controller('core/sales')
export class SaleController {
  constructor(private readonly coreService: CoreService) {}

  @Get()
  findAll() {
    return this.coreService.send('SALES:FIND');
  }
}
