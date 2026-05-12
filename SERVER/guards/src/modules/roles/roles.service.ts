import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';
import { ValidateTitle } from '../../common/validations/title.dto';
import { RoleDto } from '../../common/validations/role.dto';
import { Permission } from '../permissions/entities/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(data: ValidateTitle) {
    const existing: Role | null = await this.roleRepository.findOneBy({
      title: data.title,
    });

    if (existing) throw new CustomException(statusMessages.fa['409'], 409);

    const role: Role = this.roleRepository.create({
      title: data.title,
    });

    await this.roleRepository.save(role);

    return {
      status: HttpStatus.CREATED,
      message: statusMessages.fa['201'],
      body: null,
    };
  }

  async findAll() {
    const roles: Role[] = await this.roleRepository.find({
      order: {
        id: 'DESC',
      },
    });

    return {
      status: HttpStatus.OK,
      data: roles,
      message: statusMessages.fa['200'],
    };
  }

  async findOne(id: string) {
    const role: Role | null = await this.roleRepository.findOneBy({ id });

    if (!role) throw new CustomException(statusMessages.fa['404'], 409);

    return {
      status: HttpStatus.OK,
      message: statusMessages.fa['200'],
      body: null,
    };
  }

  async update(data: RoleDto) {
    const role: Role | null = await this.roleRepository.findOneBy({
      id: data.roleId,
    });
    const permission: Permission | null =
      await this.permissionRepository.findOneBy({ id: data.permissionId });

    if (!role || !permission) {
      throw new CustomException(statusMessages.fa['404'], 404);
    }

    role.permissions.push(permission);
    permission.roles.push(role);

    await this.roleRepository.save(role);
    await this.permissionRepository.save(permission);

    return {
      status: HttpStatus.NO_CONTENT,
      message: statusMessages.fa['204'],
      body: null,
    };
  }

  async remove(id: string) {
    await this.roleRepository.delete(id);

    return {
      status: HttpStatus.OK,
      message: statusMessages.fa['204'],
      body: null,
    };
  }
}
