import { Injectable } from '@nestjs/common';
import { MenuDto } from './dto/menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async create(data: MenuDto) {
    try {
      const existing = await this.menuRepository.findOneBy({
        section: data.section,
        title: data.title,
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const menu = this.menuRepository.create({
        title: data.title,
        section: data.section,
      });

      await this.menuRepository.save(menu);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  findAll() {}

  findOne(id: string) {}

  update(data: MenuDto) {}

  remove(id: string) {}
}
