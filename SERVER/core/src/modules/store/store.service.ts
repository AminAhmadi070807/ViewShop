import { Injectable } from '@nestjs/common';
import { StoreDto } from './dto/store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async create(data: StoreDto) {
    try {
      const existing = await this.storeRepository.findOneBy({
        alias: data.alias,
      });
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  findAll() {
    return `This action returns all store`;
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }
}
