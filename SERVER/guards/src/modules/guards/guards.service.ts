import { HttpStatus, Injectable } from '@nestjs/common';
import { GuardDto, UpdateGuardDto, ValidateGuard } from './dto/guard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Guard } from './entities/guard.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/messages/status.message';
import { Role } from '../roles/entities/role.entity';
import { User } from '../users/entities/user.entity';

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
      },
    });

    if (existing) throw new CustomException(statusMessages.fa['409'], 409);

    const role: Role | null = await this.roleRepository.findOneBy({
      id: data.roleId,
    });

    if (!role) throw new CustomException(statusMessages.fa['404'], 409);

    const guard: Guard = this.guardsRepository.create({
      patch: data.patch.toLowerCase(),
      public: data.public,
      roles: [role],
    });

    await this.guardsRepository.save(guard);

    return {
      status: HttpStatus.CREATED,
      message: statusMessages.fa['201'],
      body: null,
    };
  }

  async findAll(title?: string) {
    let guards: Guard[];

    if (title) {
      const role: Role | null = await this.roleRepository.findOneBy({ title });

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

    if (!guard) throw new CustomException(statusMessages.fa['404'], 404);

    return {
      status: HttpStatus.OK,
      message: statusMessages.fa['200'],
      body: guard,
    };
  }

  async validate(data: ValidateGuard) {
    const guard: Guard | null = await this.guardsRepository.findOne({
      where: {
        patch: data.patch.toLowerCase(),
      },
      relations: ['roles'],
    });

    if (!guard) {

    }

    const user: User | null = await this.userRepository.findOne({
      where: {
        id: data.userId,
      },
      relations: ['roles'],
      select: {
        roles: {
          id: true,
          title: true,
        },
        banned: true,
        id: true,
        user: true,
      },
    });

    if (!user) throw new CustomException(statusMessages.fa['404'], 404);

    return {
      status: HttpStatus.OK,
      message: statusMessages.fa['200'],
      body: {
        user,
        guard,
      },
    };
  }

  update(data: UpdateGuardDto) {
    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} guard`;
  }
}
