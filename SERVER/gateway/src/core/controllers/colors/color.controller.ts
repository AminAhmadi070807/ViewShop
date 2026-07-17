import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { ColorDto } from './color.dto';

@Controller('core/colors')
export class ColorController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: ColorDto) {
    return this.coreService.send('COLOR:CREATE', data);
  }
}
