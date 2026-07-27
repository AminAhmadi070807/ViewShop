import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller()
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @MessagePattern('createMenu')
  create(@Payload() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @MessagePattern('findAllMenus')
  findAll() {
    return this.menusService.findAll();
  }

  @MessagePattern('findOneMenu')
  findOne(@Payload() id: number) {
    return this.menusService.findOne(id);
  }

  @MessagePattern('updateMenu')
  update(@Payload() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(updateMenuDto.id, updateMenuDto);
  }

  @MessagePattern('removeMenu')
  remove(@Payload() id: number) {
    return this.menusService.remove(id);
  }
}
