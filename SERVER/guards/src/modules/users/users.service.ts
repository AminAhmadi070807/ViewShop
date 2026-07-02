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
import { ValidateUUID } from '../../common/validations/id.dto';

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
    // check user in core database
    await firstValueFrom(this.coreService.send('USER:ONE', data.id));

    // check user in guard database
    const existing: User | null = await this.userRepository.findOneBy({
      id: data.id,
    });

    // create new user
    if (!existing) {
      const numberOfUsers: number = await this.userRepository.count({});

      const role: Role = (await this.roleRepository.findOneBy({
        title: numberOfUsers ? 'USER' : 'AdMIN',
      })) as Role;

      const user: User = this.userRepository.create({
        id: data.id,
        roles: [role],
      });

      await this.userRepository.save(user);
    }

    // send success request
    return {
      status: HttpStatus.OK,
      body: null,
      message: statusMessages.fa['200'],
    };
  }

  async findAll() {
    const users: User[] = await this.userRepository.find({
      relations: ['roles'],
      select: {
        roles: {
          id: true,
          title: true,
          singulars: {
            id: true,
            title: true,
            permissions: {
              id: true,
              title: true,
            },
          },
        },
      },
    });

    return {
      status: HttpStatus.OK,
      message: statusMessages.fa['200'],
      data: users,
    };
  }

  async findOne(id: string) {
    const user: User | null = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['roles'],
      select: {
        roles: {
          id: true,
          title: true,
        },
      },
    });

    if (!user) throw new CustomException(statusMessages.fa['404'], 404);

    return {
      status: HttpStatus.OK,
      message: statusMessages.fa['200'],
      data: user,
    };
  }

  async toggleUserRole(data: UpdateUserDto) {
    // find one user from database
    const user: User | null = await this.userRepository.findOne({
      where: {
        id: data.userId,
      },
      relations: ['roles'],
      select: {
        id: true,
        banned: true,
      },
    });
    // find role from database
    const role: Role | null = await this.roleRepository.findOne({
      where: {
        id: data.roleId,
      },
      relations: ['users'],
      select: {
        id: true,
        title: true,
      },
    });

    // check user
    if (!user || !role) {
      throw new CustomException(statusMessages.fa['404'], 404);
    }

    const isRoleExist: boolean = user.roles.some((role: Role) => {
      return role.id === data.roleId;
    });

    if (isRoleExist) {
      user.roles = user.roles.filter((role: Role) => role.id !== data.roleId);
    } else user.roles.push(role);

    // sava data in user & role
    await this.userRepository.save(user);

    return {
      status: HttpStatus.NO_CONTENT,
      message: statusMessages.fa['204'],
      data: null,
    };
  }

  async toggleBanned(data: ValidateUUID) {
    try {
      const user: User | null = await this.userRepository.findOne({
        where: {
          id: data.id,
        },
      });

      if (!user) return new CustomException(statusMessages.fa['404'], 404);

      user.banned = !user.banned;

      await this.userRepository.save(user);

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
