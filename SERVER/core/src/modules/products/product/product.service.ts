import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  ProductDto,
  UpdateProductDto,
  UpdateStatusProductDto,
  UpdateStockProductDto,
} from '../dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { ILike, In, Repository, UpdateResult } from 'typeorm';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../common/message/message.status';
import { ParentProduct } from '../entities/parent.product.entity';
import { MediaService } from '../../media/media.service';
import { RpcException } from '@nestjs/microservices';
import { StoreService } from '../../store/store.service';
import { ProductStatusEnum } from '../../../common/enums/products/product/status.enum';
import { ColorsService } from '../../colors/colors.service';
import { FiltersService } from '../../filters/filters.service';
import { ProductFilterDto } from '../../search/dto/search.dto';
import { CommentService } from '../../comment/comment.service';

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
    @Inject(forwardRef(() => CommentService))
    private readonly commentService: CommentService,
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

      const product = this.productRepository.create({
        user: { id: data.userId },
        parentProduct: parentProduct,
        medias: media.body,
        alias: data.alias,
        store: store.body,
        details: data.details.map((item) => {
          const id = crypto.randomUUID();
          return {
            id: id,
            price: item.price,
            stock: item.stock,
            color: item.color,
          };
        }),
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

  async findAll(data: ProductFilterDto) {
    try {
      const result: Product[] = await this.productRepository.find({
        where: {
          parentProduct: {
            ...(data.title && {
              title: ILike(`%${data.title}%`),
            }),
            ...(data.product_type && {
              product_type: data.product_type,
            }),
            ...(data.return_policy_type && {
              return_policy_type: data.return_policy_type,
            }),
            ...(data.warranty_type && {
              warranty_type: data.warranty_type,
            }),
          },

          status: ProductStatusEnum.ACTIVE,
        },
        order: {
          createdAt: 'DESC',
        },
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
          },
        },
      });

      const result_array: Product[] = result.filter((item) => {
        return item.details.some((detail) => {
          const colorMatch =
            !data.colors ||
            data.colors.length === 0 ||
            data.colors.includes(detail.color);

          const minPriceMatch =
            !data.min_price || detail.price >= Number(data.min_price);

          const maxPriceMatch =
            !data.max_price || detail.price <= Number(data.max_price);

          return colorMatch && minPriceMatch && maxPriceMatch;
        });
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: result_array,
      };
    } catch (error) {
      console.log(error);
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
          },
        },
      });

      if (!product) return new CustomException(statusMessages.fa['404'], 404);

      const result = await this.commentService.findProductComments(product.id);

      if (result instanceof CustomException) return result;

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: {
          comments: result.body,
          product: product,
        },
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

  async updateStock(data: UpdateStockProductDto) {
    try {
      const result = await this.productRepository.findOneBy({ id: data.id });

      if (!result) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      for (const item of result.details) {
        if (item.id === data.product_detail_id) {
          item.stock -= +data.stock;

          await this.productRepository.save(result);

          return {
            status: 200,
            message: statusMessages.fa['200'],
            body: null,
          };
        }
      }

      return {
        status: 404,
        message: statusMessages.fa['404'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
