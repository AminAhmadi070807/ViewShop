import { HttpStatus, Injectable } from '@nestjs/common';
import { SingularDto } from './dto/singular.dto';
import { ValidateUUID } from '../../common/validations/id.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Singular } from './entities/singular.entity';
import { Repository } from 'typeorm';
import { statusMessages } from '../../common/messages/status.message';

@Injectable()
export class SingularService {
  constructor(
    @InjectRepository(Singular)
    private readonly singularRepository: Repository<Singular>,
  ) {}

  async create(data: SingularDto) {
    return 'This action adds a new singular';
  }

  async findAll() {
    const singulars: Singular[] = await this.singularRepository.find({
      order: {
        createdAt: -1,
      },
    });

    return {
      status: HttpStatus.OK,
      message: statusMessages.fa['201'],
      body: singulars,
    };
  }

  async remove(data: ValidateUUID) {
    await this.singularRepository.delete(data.id);

    return {
      status: HttpStatus.OK,
      message: statusMessages.fa['204'],
      body: null,
    };
  }
}
