import { Injectable } from '@nestjs/common';
import { FilterDto } from './dto/filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Filter } from './entities/filter.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class FiltersService {
  constructor(
    @InjectRepository(Filter)
    private readonly filterRepository: Repository<Filter>,
  ) {}

  async create(data: FilterDto) {
    try {
      const existing = await this.filterRepository.findOneBy(data);

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const result = this.filterRepository.create(data);

      return {
        status: 200,
        message: statusMessages.fa['201'],
        body: result,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  findAll() {}

  findOne(id: string) {}

  update(data: FilterDto) {}

  remove(id: string) {}
}
