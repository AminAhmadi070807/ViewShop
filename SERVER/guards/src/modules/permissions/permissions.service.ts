import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(data: CreatePermissionDto) {
    const existing = await this.permissionRepository.findOneBy({
      title: data.title,
    });

    if (existing) throw new CustomException(statusMessages.fa['409'], 409);

    const permission: Permission = this.permissionRepository.create({
      title: data.title,
    });

    await this.permissionRepository.save(permission);

    return {
      status: HttpStatus.CREATED,
      message: statusMessages.fa['201'],
      body: null,
    };
  }

  async findAll() {
    const permissions: Permission[] = await this.permissionRepository.find({
      order: {
        createdAt: -1,
      },
    });

    return {
      status: HttpStatus.OK,
      message: statusMessages.fa['200'],
      body: permissions,
    };
  }

  async findOne(id: string) {
    const permission: Permission | null =
      await this.permissionRepository.findOne({
        where: {
          id: id,
        },
      });

    if (!permission) throw new CustomException(statusMessages.fa['404'], 404);

    return {
      status: HttpStatus.OK,
      message: statusMessages.fa['200'],
      body: permission,
    };
  }

  async remove(id: string) {
    await this.permissionRepository.delete(id);

    return {
      status: HttpStatus.NO_CONTENT,
      message: statusMessages.fa['204'],
      body: null,
    };
  }
}
