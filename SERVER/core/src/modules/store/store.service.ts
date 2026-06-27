import { HttpStatus, Injectable } from '@nestjs/common';
import { StoreDto, UpdateStoreDto } from './dto/store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { MediaService } from '../media/media.service';
import { RpcException } from '@nestjs/microservices';
import { CategoriesService } from '../categories/category/categories.service';
import { StoreStatusEnum } from '../../common/enums/store/store.enum';
import { UsersService } from '../users/users.service';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    private readonly mediaService: MediaService,
    private readonly categoriesService: CategoriesService,
    private readonly usersService: UsersService,
  ) {}

  async create(data: StoreDto) {
    try {
      const owner = await this.usersService.findOne(data.owner);

      if (owner.status !== HttpStatus.OK) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const existing: Store | null = await this.storeRepository.findOneBy({
        alias: data.alias,
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const media = await this.mediaService.findId([data.logo, data.banner]);

      if (media instanceof RpcException) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const categories = await this.categoriesService.findId(data.categories);

      if (categories instanceof RpcException) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const store: Store = this.storeRepository.create({
        title: data.title,
        alias: data.alias,
        description: data.description,
        fullName: data.fullName,
        logo: {
          id: data.logo,
        },
        banner: {
          id: data.banner,
        },
        owner: {
          id: data.owner,
        },
        categories: categories.body,
      });

      const newStore: Store = await this.storeRepository.save(store);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: {
          id: newStore.id,
        },
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const stores: Store[] = await this.storeRepository.find({
        order: {
          createdAt: 'DESC',
        },
        relations: ['logo', 'banner', 'categories'],
        select: {
          categories: { id: true, title: true, icon: { id: true, path: true } },
          logo: { id: true, path: true },
          banner: { id: true, path: true },
        },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: stores,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const store: Store | null = await this.storeRepository.findOne({
        where: {
          id,
        },
        relations: ['logo', 'banner', 'categories'],
        select: {
          categories: { id: true, title: true, icon: { id: true, path: true } },
          logo: { id: true, path: true },
          banner: { id: true, path: true },
        },
      });

      if (!store) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: store,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async update(data: UpdateStoreDto) {
    try {
      const media = await this.mediaService.findId([data.logo, data.banner]);

      if (media instanceof RpcException) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      await this.storeRepository.update(data.id, {
        logo: { id: data.logo },
        banner: { id: data.banner },
        title: data.title,
        alias: data.alias,
      });

      return {
        status: 204,
        message: statusMessages.fa['204'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async delete(id: string) {
    try {
      await this.storeRepository.update(id, {
        status: StoreStatusEnum.DELETED,
      });

      return {
        status: 204,
        message: statusMessages.fa['204'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
