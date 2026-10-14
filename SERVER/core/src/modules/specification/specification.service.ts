import { Injectable } from '@nestjs/common';
import {
  SpecificationDto,
  UpdateSpecificationDto,
} from './dto/specification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Specification } from './entities/specification.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class SpecificationService {
  constructor(
    @InjectRepository(Specification)
    private readonly specificationRepository: Repository<Specification>,
  ) {}

  async create(data: SpecificationDto) {
    try {
      const result = this.specificationRepository.create({
        title: data.title,
        details: data.details.map((item) => {
          return {
            id: crypto.randomUUID(),
            title: item.title,
            details: item.details.map((detail) => {
              return {
                id: crypto.randomUUID(),
                title: detail.title,
                value: detail.value,
              };
            }),
          };
        }),
      });

      await this.specificationRepository.save(result);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: { id: result.id },
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const result = await this.specificationRepository.find({
        order: { createdAt: 'DESC' },
      });

      return { status: 200, message: statusMessages.fa['200'], body: result };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.specificationRepository.findOneBy({ id });

      if (!result) return new CustomException(statusMessages.fa['404'], 404);

      return { status: 200, message: statusMessages.fa['200'], body: result };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async update(data: UpdateSpecificationDto) {
    try {
      const result = await this.specificationRepository.findOneBy({
        id: data.id,
      });

      if (!result) return new CustomException(statusMessages.fa['404'], 404);

      result.title = data.title;
      result.details = data.details.map((item) => {
        return {
          id: crypto.randomUUID(),
          title: item.title,
          details: item.details.map((detail) => {
            return {
              id: crypto.randomUUID(),
              title: detail.title,
              value: detail.value,
            };
          }),
        };
      });

      await this.specificationRepository.save(result);

      return { status: 200, message: statusMessages.fa['200'], body: result };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.specificationRepository.delete(id);

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return { status: 204, message: statusMessages.fa['204'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
