import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SingularDto, UpdateSingularDto } from './dto/singular.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Singular } from './entities/singular.entity';
import { Repository } from 'typeorm';
import { statusMessages } from '../../common/messages/status.message';
import { ValidateUUID } from '../../common/validations/id.dto';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { RolesService } from '../roles/roles.service';
import { PermissionsService } from '../permissions/permissions.service';
import { RpcException } from '@nestjs/microservices';
import { Feature } from '../features/entities/feature.entity';
import { Role } from '../roles/entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';

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
        id: data.feature,
      });

      if (!feature) return new CustomException(statusMessages.fa['404'], 404);

      const existing = await this.singularRepository.findOneBy({
        feature: { id: data.feature },
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const singular: Singular = this.singularRepository.create({
        feature: feature,
        data: data.data,
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
        relations: ['feature'],
        select: {
          feature: {
            id: true,
            title: true,
            updatedAt: false,
            createdAt: false,
          },
        },
      });

      const result: object[] = [];
      for (const singular of singulars) {
        const data: { role: Role; permissions: Permission[] }[] = [];
        for (const item of singular.data) {
          const role = await this.roleService.findOne(item.role);

          if (role instanceof RpcException) return role;

          const permissions = await this.permissionService.findById(
            item.permissions,
          );

          if (permissions instanceof RpcException) return permissions;

          data.push({
            role: role.body,
            permissions: permissions.body,
          });
        }

        result.push({
          id: singular.id,
          feature: singular.feature,
          data: data,
          createdAt: singular.createdAt,
        });
      }

      return {
        status: HttpStatus.OK,
        message: statusMessages.fa['201'],
        body: result,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async toggleAccess(data: UpdateSingularDto) {
    try {
      const permission = await this.permissionService.findOne(data.permission);
      const role = await this.roleService.findOne(data.role);

      if (permission instanceof RpcException || role instanceof RpcException) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const singular = await this.singularRepository.findOneBy({
        id: data.id,
      });

      if (!singular) return new CustomException(statusMessages.fa['404'], 404);
      else {
        const result: boolean = singular.data.some(
          (item) => item.role === data.role,
        );

        if (result) {
          singular.data.forEach((item) => {
            if (item.role === data.role) {
              if (data.permission in item.permissions) {
                item.permissions.push(data.permission);
              } else {
                item.permissions = item.permissions.filter(
                  (p) => p !== data.permission,
                );
              }
            }
          });
        } else {
          singular.data.push({
            role: data.role,
            permissions: [data.permission],
          });
        }

        await this.singularRepository.save(singular);
      }

      return {
        status: HttpStatus.NO_CONTENT,
        message: statusMessages.fa['204'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
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
      const permissions: string[] = [];
      singular.data.forEach((item) => {
        if (item.role === roleId) {
          validate = true;
          permissions.push(...item.permissions);
        }
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
        body: permissions,
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
