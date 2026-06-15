import { Injectable } from '@nestjs/common';
import { StoreDto } from './dto/store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { MediaService } from '../media/media.service';
import { RpcException } from '@nestjs/microservices';
import { CategoriesService } from '../categories/category/categories.service';

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

  findAll() {
    return `This action returns all store`;
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }
}
