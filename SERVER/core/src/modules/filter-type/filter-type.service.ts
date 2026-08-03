import { Injectable } from '@nestjs/common';
import { FilterTypeDto, UpdateFilterTypeDto } from './dto/filter-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterType } from './entities/filter-type.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class FilterTypeService {
  constructor(
    @InjectRepository(FilterType)
    private readonly filterTypeRepository: Repository<FilterType>,
  ) {}

  async create(data: FilterTypeDto) {
    try {
      const existing = await this.filterTypeRepository.findOneBy({
        title: data.title.trim(),
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const result = this.filterTypeRepository.create({
        type: data.type,
        title: data.title,
        ...(data.details && {
          details: data.details,
        }),
      });

      await this.filterTypeRepository.save(result);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: {
          id: result.id,
        },
      };
    } catch (error) {
      console.log(error.message);
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const result = await this.filterTypeRepository.find({
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

  async findOne(id: string) {
    try {
      const result = await this.filterTypeRepository.findOneBy({ id });

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

  async update(data: UpdateFilterTypeDto) {
    try {
      const result = await this.filterTypeRepository.update(data.id, data);

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
      const result = await this.filterTypeRepository.delete(id);

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
}
