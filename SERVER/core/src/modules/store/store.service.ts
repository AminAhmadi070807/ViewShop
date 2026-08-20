import { Injectable } from '@nestjs/common';
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
import { Validate } from '../../common/validations/validate.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    private readonly mediaService: MediaService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(data: StoreDto) {
    try {
      const media = await this.mediaService.findId([data.logo, data.banner]);
      const categories = await this.categoriesService.findId(data.categories);

      if (media instanceof CustomException) return media;
      if (categories instanceof CustomException) return categories;

      const store: Store = this.storeRepository.create({
        title: data.title,
        description: data.description,
        logo: { id: data.logo },
        cell_phone: data.cell_phone,
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

  async findAll(page: number = 1) {
    try {
      const stores: Store[] = await this.storeRepository.find({
        take: (page ?? 1) * 15,
        order: { createdAt: 'DESC' },
        relations: ['logo', 'categories'],
        select: {
          categories: { id: true, title: true, icon: { id: true, path: true } },
          logo: { id: true, path: true },
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

  async findOne(data: Validate) {
    try {
      const store = await this.storeRepository.findOne({
        where: { id: data.id },
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

      const result = await this.storeRepository.update(
        { id: data.id },
        {
          logo: { id: data.logo },
          banner: { id: data.banner },
          title: data.title,
        },
      );

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

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
      const result = await this.storeRepository.update(id, {
        status: StoreStatusEnum.DELETED,
      });

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

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
