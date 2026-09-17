import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { In, Repository, UpdateResult } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';
import { RolesDto, UpdateRolesDto } from './dto/roles.dto';
import { SingularService } from '../singular/singular.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @Inject(forwardRef(() => SingularService))
    private readonly singularService: SingularService,
  ) {}

  async create(data: RolesDto) {
    try {
      const existing = await this.roleRepository.findOneBy({
        title: data.title.toUpperCase(),
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const role = this.roleRepository.create({
        title: data.title.trim().toUpperCase(),
        description: data.description.trim(),
      });

      await this.roleRepository.save(role);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: { id: role.id },
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
        body: roles,
        message: statusMessages.fa['200'],
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findByIds(id: string[]) {
    try {
      const roles = await this.roleRepository.find({ where: { id: In(id) } });

      if (!roles.length) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return { status: 200, message: statusMessages.fa['200'], body: roles };
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

      if (!role) return new CustomException(statusMessages.fa['404'], 404);

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

  async validate(id: string, singularId: string) {
    try {
      const role = await this.roleRepository.findOne({
        where: { id },
        select: { id: true },
      });

      if (!role) return new CustomException(statusMessages.fa['404'], 404);

      return await this.singularService.validate(singularId, role.id);
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.roleRepository.delete(id);

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return { status: 204, message: statusMessages.fa['204'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
