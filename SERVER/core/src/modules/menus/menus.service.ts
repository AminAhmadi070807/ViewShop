import { Injectable } from '@nestjs/common';
import { MenuDto } from './dto/menu.dto';

@Injectable()
export class MenusService {
  create(data: MenuDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: MenuDto) {}

  remove(id: string) {}
}
