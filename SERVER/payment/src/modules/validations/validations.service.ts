import { HttpStatus, Injectable } from '@nestjs/common';
import { FindValidationDto, ValidationDto } from './dto/validation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Validation } from './entities/validation.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';

@Injectable()
export class ValidationsService {
  constructor(
    @InjectRepository(Validation)
    private readonly validationRepository: Repository<Validation>,
  ) {}

  async create(data: ValidationDto) {
    try {
      const existing = await this.validationRepository.findOneBy({
        IPG: data.IPG,
        statusCode: data.statusCode,
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const validation: Validation = this.validationRepository.create(data);

      await this.validationRepository.save(validation);

      return {
        status: HttpStatus.CREATED,
        message: statusMessages.fa['201'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll(data: FindValidationDto) {
    try {
      const validations: Validation[] = await this.validationRepository.find({
        where: {
          IPG: data.IPG,
          status: data.status,
        },
      });

      return {
        status: HttpStatus.OK,
        message: statusMessages.fa['200'],
        body: validations,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const result: Validation | null = await this.validationRepository.findOne(
        {
          where: { id },
        },
      );

      if (!result) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: HttpStatus.OK,
        message: statusMessages.fa['200'],
        body: result,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    await this.validationRepository.delete(id);

    return {
      status: HttpStatus.NO_CONTENT,
      message: statusMessages.fa['204'],
      body: null,
    };
  }
}
