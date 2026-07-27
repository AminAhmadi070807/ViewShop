import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MenusService } from './menus.service';
import { MenuDto } from './dto/menu.dto';
import { Validate } from '../../common/validations/validate.dto';

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
  findOne(@Payload() data: Validate) {
    return this.menusService.findOne(data.id);
  }

  @MessagePattern('updateMenu')
  update(@Payload() data: MenuDto) {
    return this.menusService.update(data);
  }

  @MessagePattern('removeMenu')
  remove(@Payload() data: Validate) {
    return this.menusService.remove(data.id);
  }
}
