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

  async create(data: SingularDto) {
    const existing: Singular | null = await this.singularRepository.findOneBy({
      title: data.title.toUpperCase(),
      roles: {
        id: data.roleId,
      },
    });

    if (existing) throw new CustomException(statusMessages.fa['409'], 409);

    const role: Role | null = await this.roleRepository.findOneBy({
      id: data.roleId,
    });
    const permission: Permission | null =
      await this.permissionRepository.findOneBy({ id: data.permissionId });

    if (!role || !permission) {
      throw new CustomException(statusMessages.fa['404'], 404);
    }

    const singular: Singular = this.singularRepository.create({
      title: data.title.toUpperCase(),
      roles: [role],
      permissions: [permission],
    });

    await this.singularRepository.save(singular);

    return {
      status: HttpStatus.CREATED,
      message: statusMessages.fa['201'],
      body: null,
    };
  }

  async findAll() {
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
  }

  async togglePermission(data: UpdateSingularDto) {
    // get permission from database by id
    const permission: Permission | null =
      await this.permissionRepository.findOne({
        where: { id: data.permissionId },
      });

    // check permission
    if (!permission) throw new CustomException(statusMessages.fa['404'], 404);

    // get singular from database by id
    const singular: Singular | null = await this.singularRepository.findOne({
      where: {
        id: data.singularId,
      },
      relations: ['permissions'],
    });

    // check singular
    if (!singular) throw new CustomException(statusMessages.fa['404'], 404);

    // existing singular in permission already
    const existing: boolean = singular.permissions.some(
      (p: Permission): boolean => {
        return p.id === data.permissionId;
      },
    );

    // check existing
    let result: boolean;

    if (existing) result = await this.removePermission(permission, singular);
    else result = await this.addPermission(permission, singular);

    if (!result) return new CustomException(statusMessages.fa['500'], 500);

    return {
      status: HttpStatus.NO_CONTENT,
      message: statusMessages.fa['204'],
      body: null,
    };
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
