import { Injectable } from '@nestjs/common';
import { MenuDto, UpdateMenuDto } from './dto/menu.dto';
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
      const obj = {
        section: data.section,
        title: data.title,
        alias: data.alias,
      };

      const existing = await this.menuRepository.findOneBy(obj);

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const menu = this.menuRepository.create(obj);

      await this.menuRepository.save(menu);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: { id: menu.id },
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const result = await this.menuRepository.find({
        order: { createdAt: 'DESC' },
      });

      return { status: 200, message: statusMessages.fa['200'], body: result };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.menuRepository.findOneBy({ id });

      if (!result) return new CustomException(statusMessages.fa['404'], 404);

      return { status: 200, message: statusMessages.fa['200'], body: result };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async update(data: UpdateMenuDto) {
    try {
      const result = await this.menuRepository.update(data.id, data);

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return { status: 200, message: statusMessages.fa['200'], body: result };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.menuRepository.delete(id);

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return { status: 200, message: statusMessages.fa['200'], body: result };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
