import { HttpStatus, Injectable } from '@nestjs/common';
import { GuardDto, ValidateGuard } from './dto/guard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Guard } from './entities/guard.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class GuardsService {
  constructor(
    @InjectRepository(Guard)
    private readonly guardsRepository: Repository<Guard>,
    private readonly roleService: RolesService,
    private readonly userService: UsersService,
  ) {}

  async create(data: GuardDto) {
    const existing: Guard | null = await this.guardsRepository.findOne({
      where: {
        patch: data.patch.toLowerCase(),
        method: data.method,
      },
    });

    if (existing) throw new CustomException(statusMessages.fa['409'], 409);

    const role = await this.roleService.findOne(data.roleId);

    if (role instanceof RpcException) {
      return new CustomException(statusMessages.fa['404'], 409);
    }

    const guard: Guard = this.guardsRepository.create({
      patch: data.patch.toLowerCase(),
      public: data.public || false,
      roles: [role.body],
      service: data.service,
      method: data.method,
    });

    await this.guardsRepository.save(guard);

    return {
      status: HttpStatus.CREATED,
      message: statusMessages.fa['201'],
      body: null,
    };
  }

  async findAll() {
    const guards: Guard[] = await this.guardsRepository.find({
      order: {
        id: 'DESC',
      },
    });

    return {
      status: HttpStatus.OK,
      message: statusMessages.fa['200'],
      body: guards,
    };
  }

  async findOne(id: string) {
    try {
      const guard: Guard | null = await this.guardsRepository.findOne({
        where: {
          id,
        },
        relations: ['roles'],
        select: {
          roles: {
            id: true,
            users: {
              id: true,
            },
            singulars: {
              id: true,
              title: true,
            },
          },
        },
      });

      if (!guard) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: HttpStatus.OK,
        message: statusMessages.fa['200'],
        body: guard,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async validate(data: ValidateGuard) {
    try {
      // get patch from database
      const guard: Guard | null = await this.guardsRepository.findOne({
        where: {
          patch: data.patch.toLowerCase(),
          service: data.service,
          method: data.method,
        },
        relations: ['roles'],
        select: {
          roles: {
            id: true,
            title: true,
          },
        },
      });

      // check guard
      if (!guard) return new CustomException(statusMessages.fa['404'], 404);
      else if (guard.public) return true;

      // get user from database
      const user = await this.userService.findOne(data.userId);

      // check user & user banned
      if (user instanceof RpcException) {
        return new CustomException(statusMessages.fa['404'], 404);
      } else if (user.data.banned) {
        return new CustomException(statusMessages.fa['403'], 404);
      }

      // validate user access to this patch
      let validate: boolean = false;

      for (const role of guard.roles) {
        if (role.score <= user.data.role.score) {
          validate = true;
          break;
        }
      }

      // send forbidden error if user isn't access to this route
      if (!validate) return new CustomException(statusMessages.fa['403'], 403);

      return {
        status: HttpStatus.OK,
        message: statusMessages.fa['200'],
        body: true,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      await this.guardsRepository.delete(id);

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
