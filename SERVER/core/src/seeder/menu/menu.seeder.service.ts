import { Injectable } from '@nestjs/common';
import { statusMessages } from '../../common/message/message.status';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from '../../modules/menus/entities/menu.entity';
import { Repository } from 'typeorm';
import data from './object.data';

@Injectable()
export class MenuSeeder {
  constructor(
    @InjectRepository(Menu)
    private readonly repository: Repository<Menu>,
  ) {}

  async seeder() {
    try {
      for (const detail of data) {
        const exist = await this.repository.findOneBy({ id: detail.id });

        if (exist) continue;

        const result = this.repository.create({
          id: detail.id,
          alias: detail.alias,
          title: detail.title,
          section: detail.section,
        });

        await this.repository.save(result);
      }

      return { status: 200, message: statusMessages.fa['200'], body: null };
    } catch (error) {
      console.log(error);
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
