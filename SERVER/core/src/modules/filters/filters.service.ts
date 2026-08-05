import { Injectable } from '@nestjs/common';
import { FilterDto, UpdateFilterDto } from './dto/filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Filter } from './entities/filter.entity';
import { In, Repository } from 'typeorm';
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
      const existing = await this.filterRepository.findOneBy({
        title: data.title,
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const result = this.filterRepository.create({
        title: data.title,
        type: data.type,
        details: data.details,
      });

      await this.filterRepository.save(result);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: {
          id: result.id,
        },
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const result = await this.filterRepository.find({
        order: { createdAt: 'DESC' },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: result,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findById(ids: string[]) {
    try {
      const result = await this.filterRepository.find({
        where: { id: In(ids) },
        order: { createdAt: 'DESC' },
      });

      if (!result.length) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: result,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.filterRepository.findOne({ where: { id } });

      if (!result) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: result,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async update(data: UpdateFilterDto) {
    try {
      const result = await this.filterRepository.update(data.id, {
        title: data.title,
        type: data.type,
        ...(data.details && { details: data.details }),
      });

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return {
        status: 204,
        message: statusMessages.fa['204'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.filterRepository.delete(id);

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return {
        status: 204,
        message: statusMessages.fa['200'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
