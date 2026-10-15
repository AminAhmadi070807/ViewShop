import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { In, Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(data: CreatePermissionDto) {
    try {
      const existing = await this.permissionRepository.findOneBy({
        title: data.title.trim().toUpperCase(),
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const result = this.permissionRepository.create({
        title: data.title.toUpperCase().trim(),
      });

      await this.permissionRepository.save(result);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: { id: result.id },
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const result = await this.permissionRepository.find({
        order: { createdAt: 'DESC' },
      });

      return { status: 200, message: statusMessages.fa['200'], body: result };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findById(id: string[]) {
    try {
      const result = await this.permissionRepository.find({
        where: { id: In(id) },
        order: { createdAt: 'DESC' },
      });

      if (!result.length) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return { status: 200, message: statusMessages.fa['200'], body: result };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.permissionRepository.findOne({ where: { id } });

      if (!result) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return { status: 200, message: statusMessages.fa['200'], body: result };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.permissionRepository.delete(id);

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return { status: 204, message: statusMessages.fa['204'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
