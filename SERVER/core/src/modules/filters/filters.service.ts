import { Injectable } from '@nestjs/common';
import { FilterDto, FilterOptionsDto, UpdateFilterDto } from './dto/filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Filter } from './entities/filter.entity';
import { In, Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { FilterTypeService } from '../filter-type/filter-type.service';

@Injectable()
export class FiltersService {
  constructor(
    @InjectRepository(Filter)
    private readonly filterRepository: Repository<Filter>,
    private readonly filterTypeService: FilterTypeService,
  ) {}

  async create(data: FilterDto) {
    try {
      const filterType = await this.filterTypeService.findOne(data.typeId);
      const existing = await this.filterRepository.findOneBy({
        title: data.title,
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);
      if (filterType instanceof CustomException) return filterType;

      const result = this.filterRepository.create({
        filterTypes: [filterType.body],
        title: data.title,
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
        relations: ['filterTypes'],
        select: {
          filterTypes: {
            id: true,
            title: true,
            public: true,
            type: true,
          },
        },
        order: {
          createdAt: 'DESC',
        },
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
      const result = await this.filterRepository.findOne({
        where: { id },
        relations: ['filterTypes'],
        select: {
          filterTypes: {
            id: true,
            title: true,
            public: true,
            type: true,
            details: true,
          },
        },
      });

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

  async filterToggleType(data: FilterOptionsDto) {
    try {
      const result = await this.findOne(data.id);
      const filterType = await this.filterTypeService.findOne(data.typeId);

      if (result instanceof CustomException) return result;
      if (filterType instanceof CustomException) return filterType;

      const existing = result.body.filterTypes.some((type) => {
        return type.id === data.typeId;
      });

      if (existing) {
        result.body.filterTypes = result.body.filterTypes.filter((item) => {
          return item.id !== data.typeId;
        });
      } else result.body.filterTypes.push(filterType.body);

      await this.filterRepository.save(result.body);

      return {
        status: 200,
        message: statusMessages.fa['200'],
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
        status: 200,
        message: statusMessages.fa['200'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
