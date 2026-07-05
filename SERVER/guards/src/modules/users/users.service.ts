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
import { RpcException } from '@nestjs/microservices';

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
    try {
      // check user in core database
      const result: CustomException | object = (await firstValueFrom(
        this.coreService.send('USER:ONE', data.id),
      )) as CustomException | object;

      if (result instanceof RpcException) return result;
      // check user in guard database
      const existing: User | null = await this.userRepository.findOneBy({
        id: data.id,
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      // create new user
      const numberOfUsers: number = await this.userRepository.count({});

      const role: Role = (await this.roleRepository.findOneBy({
        title: numberOfUsers ? 'USER' : 'ADMIN',
      })) as Role;

      const newUser: User = this.userRepository.create({
        id: data.id,
        role: role,
      });

      const user = await this.userRepository.save(newUser);

      // send success request
      return {
        status: HttpStatus.OK,
        body: user,
        message: statusMessages.fa['200'],
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const users: User[] = await this.userRepository.find({
        relations: ['role'],
        select: {
          role: {
            id: true,
            title: true,
          },
        },
      });

      return {
        status: HttpStatus.OK,
        message: statusMessages.fa['200'],
        data: users,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const user: User | null = await this.userRepository.findOne({
        where: {
          id,
        },
        relations: ['role'],
        select: {
          role: {
            id: true,
            title: true,
          },
        },
      });

      if (!user) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: HttpStatus.OK,
        message: statusMessages.fa['200'],
        data: user,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async updateRole(data: UpdateUserDto) {
    try {
      // find one user from database
      const user: User | null = await this.userRepository.findOne({
        where: {
          id: data.userId,
        },
        relations: ['role'],
        select: {
          id: true,
          banned: true,
        },
      });

      // check user
      if (!user) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      // sava data in user & role
      await this.userRepository.save(user);

      return {
        status: HttpStatus.NO_CONTENT,
        message: statusMessages.fa['204'],
        data: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
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
