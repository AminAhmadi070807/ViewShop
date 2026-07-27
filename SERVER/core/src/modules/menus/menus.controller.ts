import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MenusService } from './menus.service';
import { MenuDto } from './dto/menu.dto';

@Controller()
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @MessagePattern('createMenu')
  create(@Payload() createMenuDto: MenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @MessagePattern('findAllMenus')
  findAll() {
    return this.menusService.findAll();
  }

  @MessagePattern('findOneMenu')
  findOne(@Payload() id: string) {
    return this.menusService.findOne(id);
  }

  @MessagePattern('updateMenu')
  update(@Payload() data: MenuDto) {
    return this.menusService.update(data);
  }

  @MessagePattern('removeMenu')
  remove(@Payload() id: string) {
    return this.menusService.remove(id);
  }
}
