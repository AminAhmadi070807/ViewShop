import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';
import { FeatureDto, UpdateFeatureDto } from './dto/feature.dto';
import { RolesService } from '../roles/roles.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
    private readonly roleService: RolesService,
  ) {}

  async create(data: FeatureDto) {
    try {
      const existing = await this.featureRepository.findOneBy({
        title: data.title.toUpperCase(),
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const role = await this.roleService.findByIds(data.roles);

      if (role instanceof RpcException) return role;

      const result: Feature = this.featureRepository.create({
        title: data.title.trim().toUpperCase(),
        roles: role.body,
      });

      await this.featureRepository.save(result);

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
      const result = await this.featureRepository.find({
        order: { createdAt: 'DESC' },
      });

      return { status: 200, message: statusMessages.fa['200'], body: result };
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
      const role = await this.roleService.findByIds(data.roles);

      if (role instanceof RpcException) return role;

      const result = await this.featureRepository.update(data.id, {
        title: data.title.trim().toUpperCase(),
        roles: role.body,
      });

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return { status: 204, message: statusMessages.fa['204'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async validate(id: string, roleId: string) {
    try {
      const feature: Feature | null = await this.featureRepository.findOne({
        where: {
          id,
        },
        relations: ['roles', 'singular'],
      });

      if (!feature) return new CustomException(statusMessages.fa['404'], 404);

      let validate: boolean = false;
      for (const role of feature.roles) {
        if (role.id === roleId) {
          validate = true;
          break;
        }
      }

      if (!validate) return new CustomException(statusMessages.fa['403'], 403);

      return await this.roleService.validate(roleId, feature.singular.id);
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
