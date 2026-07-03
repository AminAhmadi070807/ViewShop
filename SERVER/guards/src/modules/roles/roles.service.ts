import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';
import { RolesDto, UpdateRolesDto } from './dto/roles.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(data: RolesDto) {
    const title: string = data.title.toUpperCase();

    const existing: Role | null = await this.roleRepository.findOneBy({
      title,
    });

    if (existing) throw new CustomException(statusMessages.fa['409'], 409);

    const role: Role = this.roleRepository.create({
      title: data.title.trim(),
      description: data.description.trim(),
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
        createdAt: 'DESC',
      },
    });

    return {
      status: HttpStatus.OK,
      data: roles,
      message: statusMessages.fa['200'],
    };
  }

  async findOne(id: string) {
    try {
      const role: Role | null = await this.roleRepository.findOne({
        where: {
          id,
        },
        relations: ['singulars'],
        select: {
          singulars: {
            id: true,
            title: true,
          },
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

  async remove(id: string) {
    try {
      await this.roleRepository.delete(id);

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
