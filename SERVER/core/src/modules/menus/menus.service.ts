import { Injectable } from '@nestjs/common';
import { MenuDto } from './dto/menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  create(data: MenuDto) {}

  findAll() {}

  findOne(id: string) {}

  update(data: MenuDto) {}

  remove(id: string) {}
}
