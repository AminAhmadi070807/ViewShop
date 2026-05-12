import { HttpStatus, Injectable } from '@nestjs/common';
import { SingularDto } from './dto/singular.dto';
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
      role,
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
    const singulars = await this.singularRepository
      .createQueryBuilder('singular')
      .leftJoinAndSelect('singular.role', 'role')
      .leftJoinAndSelect('singular.permissions', 'permissions')
      .select([
        'singular.id',
        'singular.title',
        'role.id',
        'role.title',
        'permissions.id',
        'permissions.title',
      ])
      .orderBy('singular.createdAt', 'DESC')
      .getMany();

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
