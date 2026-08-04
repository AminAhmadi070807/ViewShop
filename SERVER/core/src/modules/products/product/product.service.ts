import { Injectable } from '@nestjs/common';
import {
  ProductDto,
  UpdateProductDto,
  UpdateStatusProductDto,
} from '../dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { In, Repository, UpdateResult } from 'typeorm';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../common/message/message.status';
import { ParentProduct } from '../entities/parent.product.entity';
import { MediaService } from '../../media/media.service';
import { RpcException } from '@nestjs/microservices';
import { StoreService } from '../../store/store.service';
import { ProductStatusEnum } from '../../../common/enums/products/product/status.enum';
import { ColorsService } from '../../colors/colors.service';
import { FiltersService } from '../../filters/filters.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ParentProduct)
    private readonly parentProductRepository: Repository<ParentProduct>,
    private readonly mediaService: MediaService,
    private readonly storeService: StoreService,
    private readonly colorService: ColorsService,
    private readonly filterService: FiltersService,
  ) {}

  async create(data: ProductDto) {
    try {
      const existing = await this.productRepository.findOneBy({
        alias: data.alias,
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const parentProduct = await this.parentProductRepository.findOneBy({
        id: data.parentProductId,
      });

      if (!parentProduct) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const resultColor = data.details.map((item) => item.color);
      const media = await this.mediaService.findId(data.medias);
      const store = await this.storeService.findOne({
        user: data.userId,
        id: data.store,
      });
      const colors = await this.colorService.findByCode(resultColor);
      const filters = await this.filterService.findById(data.filters);

      if (media instanceof CustomException) return media;
      if (store instanceof CustomException) return store;
      if (colors instanceof CustomException) return colors;
      if (filters instanceof CustomException) return filters;

      const product: Product = this.productRepository.create({
        user: { id: data.userId },
        parentProduct: parentProduct,
        medias: media.body,
        alias: data.alias,
        store: store.body,
        details: data.details,
        filters: filters.body,
      });

      const newProduct = await this.productRepository.save(product);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: {
          id: newProduct.id,
        },
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const products: Product[] = await this.productRepository.find({
        order: { createdAt: 'DESC' },
        relations: ['medias', 'store', 'filters', 'filters.filterTypes'],
        select: {
          medias: {
            id: true,
            path: true,
            title: true,
          },
          store: {
            id: true,
            title: true,
            logo: true,
            banner: true,
            alias: true,
          },
        },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: products,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
        relations: ['medias', 'store', 'filters'],
        select: {
          medias: {
            id: true,
            path: true,
            title: true,
          },
          store: {
            id: true,
            title: true,
            logo: true,
            banner: true,
            alias: true,
          },
        },
      });

      if (!product) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: product,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findById(ids: string[]) {
    try {
      const product: Product[] = await this.productRepository.find({
        where: { id: In(ids) },
        relations: ['medias', 'store', 'filters'],
        select: {
          medias: {
            id: true,
            path: true,
            title: true,
          },
          store: {
            id: true,
            title: true,
            logo: true,
            banner: true,
            alias: true,
          },
        },
      });

      if (!product.length) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: product,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async update(data: UpdateProductDto) {
    try {
      const medias = await this.mediaService.findId(data.medias);
      const product = await this.productRepository.findOneBy({ id: data.id });

      if (medias instanceof RpcException || !product) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      product.medias = medias.body;
      product.discount_percent = data.discount_percent;
      product.status = ProductStatusEnum.PENDING_APPROVAL;
      product.details = data.details;

      await this.productRepository.save(product);

      return {
        status: 204,
        message: statusMessages.fa['204'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async updateStatus(data: UpdateStatusProductDto) {
    try {
      const result: UpdateResult = await this.productRepository.update(
        data.id,
        {
          status: data.status,
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
}
