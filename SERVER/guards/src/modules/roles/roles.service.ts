import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateRoleDto, CreateRoleDto } from './dto/role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(data: CreateRoleDto) {
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
      message: 'Create new role successfully.',
      body: null,
    };
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: string, data: UpdateRoleDto) {
    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
