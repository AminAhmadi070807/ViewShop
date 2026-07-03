import { HttpStatus, Injectable } from '@nestjs/common';
import { SingularDto, UpdateSingularDto } from './dto/singular.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Singular } from './entities/singular.entity';
import { Repository } from 'typeorm';
import { statusMessages } from '../../common/messages/status.message';
import { ValidateUUID } from '../../common/validations/id.dto';
import { Role } from '../roles/entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { CustomException } from '../../common/exceptions/custom.exception.error';

@Injectable()
export class SingularService {
  constructor(
    @InjectRepository(Singular)
    private readonly singularRepository: Repository<Singular>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  // create new singular
  async create(data: SingularDto) {
    try {
      const role = await this.roleRepository.findOneBy({
        id: data.roleId,
      });

      if (!role) return new CustomException(statusMessages.fa['404'], 404);

      const permission = await this.permissionRepository.findOneBy({
        id: data.permissionId,
      });

      if (!permission) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const existing: Singular | null = await this.singularRepository.findOneBy(
        {
          title: data.title.toUpperCase(),
        },
      );

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const singular: Singular = this.singularRepository.create({
        title: data.title.toUpperCase(),
        roles: [role],
        permissions: [permission],
        data: [
          {
            role: role.id,
            permissions: [{ id: permission.id }],
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
        relations: ['roles', 'permissions'],
        select: {
          roles: {
            id: true,
            title: true,
          },
          permissions: {
            id: true,
            title: true,
          },
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
      const permission = await this.permissionRepository.findOne({
        where: { id: data.permissionId },
      });

      if (!permission) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const singular = await this.singularRepository.findOne({
        where: {
          id: data.singularId,
        },
        relations: ['permissions'],
      });

      if (!singular) return new CustomException(statusMessages.fa['404'], 404);

      const existing: boolean = singular.permissions.some(
        (p: Permission): boolean => {
          return p.id === data.permissionId;
        },
      );

      let result: boolean;
      if (existing) result = await this.removePermission(permission, singular);
      else result = await this.addPermission(permission, singular);

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

  async validate(id: string, roleId: string, permissionId: string) {
    try {
      const singular: Singular | null = await this.singularRepository.findOne({
        where: {
          id: id,
        },
        relations: ['roles', 'permissions'],
        select: {
          id: true,
          title: true,
          roles: {
            id: true,
          },
          permissions: {
            id: true,
            title: true,
          },
        },
      });

      if (!singular) return new CustomException(statusMessages.fa['404'], 404);

      if (!singular.roles.length || !singular.permissions.length) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      let data: { id: string }[] = [];
      singular.data.forEach((item) => {
        if (item.role === roleId) data = item.permissions;
      });

      let validate: boolean = false;
      for (const item of data) {
        if (item.id === permissionId) {
          validate = true;
          break;
        }
      }

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
