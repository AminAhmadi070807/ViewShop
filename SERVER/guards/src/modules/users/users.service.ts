import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CoreService } from '../../core/core.service';
import { statusMessages } from '../../common/messages/status.message';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { Role } from '../roles/entities/role.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly coreService: CoreService,
  ) {}

  async create(data: CreateUserDto) {
    await firstValueFrom(this.coreService.send('USER:ONE', data.id));
  }

  async findAll() {
    const users: User[] = await this.userRepository.find({
      relations: ['roles'],
    });

    return {
      status: HttpStatus.OK,
      message: statusMessages.fa['201'],
      data: users,
    };
  }

  async findOne(id: string) {
    const user: User | null = await this.userRepository.findOneBy({ id });

    if (!user) throw new CustomException(statusMessages.fa['404'], 404);

    return {
      status: HttpStatus.OK,
      message: statusMessages.fa['200'],
      data: user,
    };
  }

  async update(data: UpdateUserDto) {
    // find one user from database
    const user: User | null = await this.userRepository.findOneBy({
      id: data.userId,
    });
    // find role from database
    const role: Role | null = await this.roleRepository.findOneBy({
      id: data.roleId,
    });

    // check user
    if (!user || !role) {
      throw new CustomException(statusMessages.fa['404'], 404);
    }

    // push role to users role
    user.roles.push(role);
    // push user to roles
    role.users.push(user);

    // sava data in user & role
    await this.userRepository.save(user);
    await this.roleRepository.save(role);

    return {
      status: HttpStatus.NO_CONTENT,
      message: statusMessages.fa['204'],
      data: null,
    };
  }

  async removeRoleFromUser(data: UpdateUserDto) {
    const user: User | null = await this.userRepository.findOneBy({
      id: data.userId,
    });
    const role: Role | null = await this.roleRepository.findOneBy({
      id: data.roleId,
    });

    if (!user || !role) {
      throw new CustomException(statusMessages.fa['404'], 404);
    }

    user.roles = user.roles.filter((role: Role) => {
      return role.id !== data.roleId;
    });

    await this.userRepository.save(user);

    return {
      status: HttpStatus.NO_CONTENT,
      message: statusMessages.fa['204'],
      data: null,
    };
  }
}
