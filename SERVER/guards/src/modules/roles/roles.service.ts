import { Injectable } from '@nestjs/common';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class RolesService {
  create(data: RoleDto) {
    return data;
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: string, data: RoleDto) {
    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
