import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { MenuDto } from './menu.dto';

@Controller('core/menus')
export class MenusController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() data: MenuDto) {
    return this.coreService.send('MENU:CREATE', data);
  }
}
