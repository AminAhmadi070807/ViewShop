import { HttpStatus, Injectable } from '@nestjs/common';
import { GuardDto, ValidateGuard } from './dto/guard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Guard } from './entities/guard.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';
import { Role } from '../roles/entities/role.entity';
import { User } from '../users/entities/user.entity';
import { ValidateOptionalTitle } from '../../common/validations/title.dto';

@Injectable()
export class GuardsService {
  constructor(
    @InjectRepository(Guard)
    private readonly guardsRepository: Repository<Guard>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: GuardDto) {
    const existing: Guard | null = await this.guardsRepository.findOne({
      where: {
        patch: data.patch.toLowerCase(),
        method: data.method,
      },
    });

    if (existing) throw new CustomException(statusMessages.fa['409'], 409);

    const role: Role | null = await this.roleRepository.findOneBy({
      id: data.roleId,
    });

    if (!role) throw new CustomException(statusMessages.fa['404'], 409);

    const guard: Guard = this.guardsRepository.create({
      patch: data.patch.toLowerCase(),
      public: data.public || false,
      roles: [role],
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

  async findAll(data: ValidateOptionalTitle) {
    let guards: Guard[];

    if (data.title) {
      const role: Role | null = await this.roleRepository.findOneBy({
        title: data.title,
      });

      if (!role) throw new CustomException(statusMessages.fa['404'], 404);

      guards = await this.guardsRepository.find({
        where: {
          roles: {
            id: role.id,
          },
        },
        order: {
          id: 'DESC',
        },
      });
    } else {
      guards = await this.guardsRepository.find({
        order: {
          id: 'DESC',
        },
      });
    }

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
              user: true,
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
      const user: User | null = await this.userRepository.findOne({
        where: {
          user: data.userId,
        },
        relations: ['roles'],
        select: {
          roles: {
            id: true,
            title: true,
            score: true,
          },
          banned: true,
          id: true,
          user: true,
        },
      });

      // check user & user banned
      if (!user) return new CustomException(statusMessages.fa['404'], 404);
      else if (user.banned) {
        return new CustomException(statusMessages.fa['403'], 404);
      }

      // validate user access to this patch
      let validate: boolean = false;

      for (const role of guard.roles) {
        for (const userRole of user.roles) {
          if (role.score <= userRole.score) {
            validate = true;
            break;
          }
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
