import { HttpStatus, Injectable } from '@nestjs/common';
import { GuardDto } from './dto/guard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Guard } from './entities/guard.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';

@Injectable()
export class GuardsService {
  constructor(
    @InjectRepository(Guard)
    private readonly guardsRepository: Repository<Guard>,
  ) {}

  async create(data: GuardDto) {
    const existing: Guard | null = await this.guardsRepository.findOne({
      where: {
        path: data.patch.toLowerCase(),
        method: data.method,
      },
    });

    if (existing) throw new CustomException(statusMessages.fa['409'], 409);

    const guard: Guard = this.guardsRepository.create({
      path: data.patch.toLowerCase(),
      public: data.public || false,
      service: data.service,
      method: data.method,
    });

    await this.guardsRepository.save(guard);

    return {
      status: HttpStatus.CREATED,
      message: statusMessages.fa['201'],
      body: null,
    };
  }

  async findAll() {
    const guards: Guard[] = await this.guardsRepository.find({
      order: {
        id: 'DESC',
      },
    });

    return {
      status: HttpStatus.OK,
      message: statusMessages.fa['200'],
      body: guards,
    };
  }

  async findOne(id: string) {
    try {
      const guard: Guard | null = await this.guardsRepository.findOne({
        where: {
          id,
        },
      });

      if (!guard) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: HttpStatus.OK,
        message: statusMessages.fa['200'],
        body: guard,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      await this.guardsRepository.delete(id);

      return {
        status: HttpStatus.NO_CONTENT,
        message: statusMessages.fa['204'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
