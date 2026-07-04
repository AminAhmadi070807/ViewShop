import { HttpStatus, Injectable } from '@nestjs/common';
import { GuardDto, ValidateGuard } from './dto/guard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Guard } from './entities/guard.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';
import { UsersService } from '../users/users.service';
import { RpcException } from '@nestjs/microservices';
import { FeaturesService } from '../features/features.service';
import { PermissionsService } from '../permissions/permissions.service';

@Injectable()
export class GuardsService {
  constructor(
    @InjectRepository(Guard)
    private readonly guardsRepository: Repository<Guard>,
    private readonly userService: UsersService,
    private readonly featureService: FeaturesService,
    private readonly permissionService: PermissionsService,
  ) {}

  async create(data: GuardDto) {
    try {
      const feature = await this.featureService.findOne(data.feature);
      const permission = await this.permissionService.findOne(data.permission);

      if (
        feature instanceof RpcException ||
        permission instanceof RpcException
      ) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const existing: Guard | null = await this.guardsRepository.findOne({
        where: {
          method: data.method,
          feature: { id: data.feature },
          permission: { id: data.permission },
        },
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const guard: Guard = this.guardsRepository.create({
        public: data.public || false,
        service: data.service,
        method: data.method,
        feature: feature.body,
        permission: permission.body,
      });

      await this.guardsRepository.save(guard);

      return {
        status: HttpStatus.CREATED,
        message: statusMessages.fa['201'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    const guards: Guard[] = await this.guardsRepository.find({
      order: {
        createdAt: 'DESC',
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

  async validate(data: ValidateGuard) {
    // get patch from database
    const guard: Guard | null = await this.guardsRepository.findOne({
      where: {
        service: data.service,
        method: data.method,
        permission: { title: data.permission },
        feature: { title: data.feature },
      },
      relations: ['feature', 'permission'],
      select: {
        feature: { id: true },
        permission: { id: true },
      },
    });

    // check guard
    if (!guard) throw new CustomException(statusMessages.fa['404'], 404);
    else if (guard.public) return true;

    // get user from database
    const user = await this.userService.findOne(data.userId);

    // check user & user banned
    if (user instanceof RpcException) {
      throw new CustomException(statusMessages.fa['404'], 404);
    } else if (user.data.banned) {
      throw new CustomException(statusMessages.fa['403'], 403);
    }

    return this.featureService.validate(
      guard.feature.id,
      user.data.role.id,
      guard.permission.id,
    );
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
