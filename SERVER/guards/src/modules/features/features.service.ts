import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ValidateTitle } from '../../common/validations/title.dto';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';
import { UpdateFeatureDto } from './dto/feature.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
    private readonly roleService: RolesService,
  ) {}

  async create(data: ValidateTitle) {
    try {
      const existing: Feature | null = await this.featureRepository.findOneBy({
        title: data.title,
      });

      if (!existing) return new CustomException(statusMessages.fa['409'], 409);

      const result: Feature = this.featureRepository.create({
        title: data.title,
      });

      await this.featureRepository.save(result);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const result: Feature[] = await this.featureRepository.find({
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

  async findOne(id: string) {
    try {
      const result: Feature | null = await this.featureRepository.findOneBy({
        id,
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

  async update(data: UpdateFeatureDto) {
    try {
      const result: UpdateResult = await this.featureRepository.update(
        data.id,
        { title: data.title },
      );

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

  async validate(id: string, role: string, permission: string) {
    try {
      const feature: Feature | null = await this.featureRepository.findOne({
        where: {
          id,
        },
        relations: ['roles'],
      });

      if (!feature) return new CustomException(statusMessages.fa['404'], 404);

      return this.roleService.validate(role, feature.title, permission);
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      await this.featureRepository.delete(id);

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
