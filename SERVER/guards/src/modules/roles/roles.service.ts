import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';
import { RolesDto, UpdateRolesDto } from './dto/roles.dto';
import { SingularService } from '../singular/singular.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private readonly singularRepository: SingularService,
  ) {}

  async create(data: RolesDto) {
    try {
      const existing: Role | null = await this.roleRepository.findOneBy({
        title: data.title.toUpperCase(),
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const role: Role = this.roleRepository.create({
        title: data.title.trim().toUpperCase(),
        description: data.description.trim(),
      });

      await this.roleRepository.save(role);

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
    try {
      const roles: Role[] = await this.roleRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });

      return {
        status: HttpStatus.OK,
        data: roles,
        message: statusMessages.fa['200'],
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const role: Role | null = await this.roleRepository.findOne({
        where: {
          id,
        },
      });

      if (!role) return new CustomException(statusMessages.fa['404'], 409);

      return {
        status: HttpStatus.OK,
        message: statusMessages.fa['200'],
        body: role,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async update(data: UpdateRolesDto) {
    try {
      const result: UpdateResult = await this.roleRepository.update(data.id, {
        title: data.title,
        description: data.description,
      });

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
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

  async validate(id: string, feature: string, permission: string) {
    try {
      const role: Role | null = await this.roleRepository.findOne({
        where: {
          id,
        },
        relations: ['features', 'singulars', 'singulars.permissions'],
        select: {
          id: true,
          singulars: {
            id: true,
            permissions: {
              id: true,
            },
          },
        },
      });

      if (!role) return new CustomException(statusMessages.fa['404'], 404);

      let permissionId: string | null = null;
      let singularId: string | null = null;

      role.singulars.forEach((singular) => {
        if (singular.title === feature) {
          singularId = singular.id;
          for (const item of singular.permissions) {
            if (item.title === permission) {
              permissionId = item.id;
              break;
            }
          }
        } else {
          permissionId = null;
          singularId = null;
        }
      });

      if (!permissionId || !singularId) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return this.singularRepository.validate(
        singularId,
        role.id,
        permissionId,
      );
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      await this.roleRepository.delete(id);

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
