import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SingularDto, UpdateSingularDto } from './dto/singular.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Singular } from './entities/singular.entity';
import { Repository } from 'typeorm';
import { statusMessages } from '../../common/messages/status.message';
import { ValidateUUID } from '../../common/validations/id.dto';
import { Permission } from '../permissions/entities/permission.entity';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { RolesService } from '../roles/roles.service';
import { PermissionsService } from '../permissions/permissions.service';
import { RpcException } from '@nestjs/microservices';
import { Feature } from '../features/entities/feature.entity';

@Injectable()
export class SingularService {
  constructor(
    @InjectRepository(Singular)
    private readonly singularRepository: Repository<Singular>,
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
    @Inject(forwardRef(() => RolesService))
    private readonly roleService: RolesService,
    private readonly permissionService: PermissionsService,
  ) {}

  // create new singular
  async create(data: SingularDto) {
    try {
      const feature = await this.featureRepository.findOneBy({
        id: data.,
      });

      if (
        role instanceof RpcException ||
        permission instanceof RpcException ||
        !feature
      ) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const existing = await this.singularRepository.findOneBy({
        title: data.title.toUpperCase(),
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const singular: Singular = this.singularRepository.create({
        title: data.title.toUpperCase(),
        roles: [role.body],
        permissions: [permission.body],
        data: [
          {
            role: role.body.id,
            permissions: [{ id: permission.body.id }],
          },
        ],
      });

      await this.singularRepository.save(singular);

      return {
        status: HttpStatus.CREATED,
        message: statusMessages.fa['201'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  // findAll singular
  async findAll() {
    try {
      const singulars = await this.singularRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });

      return {
        status: HttpStatus.OK,
        message: statusMessages.fa['201'],
        body: singulars,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  // toggle permission in singular
  async togglePermission(data: UpdateSingularDto) {
    try {
      const permission = await this.permissionService.findOne(
        data.permissionId,
      );
      const singular = await this.singularRepository.findOne({
        where: {
          id: data.singularId,
        },
        relations: ['permissions'],
      });

      if (permission instanceof RpcException || !singular) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const existing: boolean = singular.data.some(
        (item): boolean => {
          return item.permission === data.permissionId;
        },
      );

      let result: boolean;
      if (existing) {
        result = await this.removePermission(permission.body, singular);
      } else result = await this.addPermission(permission.body, singular);

      if (!result) return new CustomException(statusMessages.fa['500'], 500);

      return {
        status: HttpStatus.NO_CONTENT,
        message: statusMessages.fa['204'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  // add permission to singular
  async addPermission(permission: Permission, singular: Singular) {
    try {
      singular.permissions.push(permission);

      await this.singularRepository.save(singular);

      return true;
    } catch {
      return false;
    }
  }

  // remove permission from singular
  async removePermission(permission: Permission, singular: Singular) {
    try {
      singular.permissions = singular.permissions.filter(
        (p): boolean => p.id !== permission.id,
      );

      await this.singularRepository.save(singular);

      return true;
    } catch {
      return false;
    }
  }

  // validate user access to feature
  async validate(id: string, roleId: string) {
    try {
      const singular: Singular | null = await this.singularRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!singular) return new CustomException(statusMessages.fa['404'], 404);

      let validate: boolean = false;
      singular.data.forEach((item) => {
        if (item.role === roleId) validate = true;
      });

      if (!validate) {
        return {
          status: HttpStatus.FORBIDDEN,
          message: statusMessages.fa['403'],
          body: validate,
        };
      }

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: validate,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  // remove singular
  async remove(data: ValidateUUID) {
    try {
      await this.singularRepository.delete(data.id);

      return {
        status: HttpStatus.OK,
        message: statusMessages.fa['204'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
