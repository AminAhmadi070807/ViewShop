import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MenusService } from './menus.service';
import { MenuDto, UpdateMenuDto } from './dto/menu.dto';
import { Validate } from '../../common/validations/validate.dto';

@Controller()
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @MessagePattern('MENU:CREATE')
  create(@Payload() createMenuDto: MenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @MessagePattern('MENU:FIND')
  findAll() {
    return this.menusService.findAll();
  }

  @MessagePattern('MENU:ONE')
  findOne(@Payload() data: Validate) {
    return this.menusService.findOne(data.id);
  }

  @MessagePattern('MENU:UPDATE')
  update(@Payload() data: UpdateMenuDto) {
    return this.menusService.update(data);
  }

  @MessagePattern('MENU:DELETE')
  remove(@Payload() data: Validate) {
    return this.menusService.remove(data.id);
  }
}
