import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { BrandDto } from './brand.dto';

@Controller('core/brands')
export class BrandController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: BrandDto) {
    return this.coreService.send('BRAND:CREATE', data);
  }
}
