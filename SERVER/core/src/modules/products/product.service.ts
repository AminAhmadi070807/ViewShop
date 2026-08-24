import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  ProductDto,
  UpdateProductDto,
  UpdateStatusProductDto,
  UpdateStockProductDto,
} from './dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ILike, In, Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { MediaService } from '../media/media.service';
import { StoreService } from '../store/store.service';
import { ProductStatusEnum } from '../../common/enums/products/product/status.enum';
import { ColorsService } from '../colors/colors.service';
import { ProductFilterDto } from '../search/dto/search.dto';
import { CommentService } from '../comment/comment.service';
import { BrandsService } from '../brands/brands.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly mediaService: MediaService,
    private readonly storeService: StoreService,
    private readonly colorService: ColorsService,
    @Inject(forwardRef(() => CommentService))
    private readonly commentService: CommentService,
    private readonly brandService: BrandsService,
  ) {}

  async create(data: ProductDto) {
    try {
      const existing = await this.productRepository.findOneBy({
        alias: data.alias,
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const resultColor = data.details.map((item) => item.color);
      const media = await this.mediaService.findId(data.medias);
      const store = await this.storeService.findOne({
        user: data.userId,
        id: data.store,
      });
      const colors = await this.colorService.findByCode(resultColor);
      const brand = await this.brandService.findOne(data.brand);

      if (media instanceof CustomException) return media;
      if (store instanceof CustomException) return store;
      if (colors instanceof CustomException) return colors;
      if (brand instanceof CustomException) return brand;

      const product = this.productRepository.create({
        user: { id: data.userId },
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
        filters_detail: data.filter_details.map((item) => {
          return {
            id: item.id,
            details: item.details.map((detail) => {
              return {
                id: crypto.randomUUID(),
                title: detail.title,
                value: detail.value,
              };
            }),
          };
        }),
        discount_percent: data.discount_percent,
        title: data.title,
        description: data.description,
        brand: brand.body,
      });

      await this.productRepository.save(product);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: { id: product.id },
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll(data: ProductFilterDto) {
    try {
      const result = await this.productRepository.find({
        where: [
          {
            ...(data.title && {
              title: ILike(`%${data.title}%`),
            }),
          },
          {
            ...(data.title && {
              description: ILike(`%${data.title}%`),
            }),
          },
        ],
        order: { createdAt: 'DESC' },
        relations: ['medias', 'store', 'filters'],
        select: {
          medias: { id: true, path: true, title: true },
          store: { id: true, title: true, logo: true },
        },
      });

      return { status: 200, message: statusMessages.fa['200'], body: result };
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
          medias: { id: true, path: true, title: true },
          store: { id: true, title: true, logo: true },
        },
      });

      if (!product) return new CustomException(statusMessages.fa['404'], 404);

      const result = await this.commentService.findProductComments(product.id);

      if (result instanceof CustomException) return result;

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: { comments: result.body, product: product },
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findById(ids: string[]) {
    try {
      const product = await this.productRepository.find({
        where: { id: In(ids) },
        relations: ['medias', 'store', 'filters'],
        select: {
          medias: { id: true, path: true, title: true },
          store: { id: true, title: true, logo: true },
        },
      });

      if (!product.length) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return { status: 200, message: statusMessages.fa['200'], body: product };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async update(data: UpdateProductDto) {
    try {
      const medias = await this.mediaService.findId(data.medias);
      const product = await this.findOne(data.id);

      if (medias instanceof CustomException) return medias;
      if (product instanceof CustomException) return product;

      product.body.product.medias = medias.body;
      product.body.product.discount_percent = data.discount_percent;
      product.body.product.status = ProductStatusEnum.PENDING_APPROVAL;
      product.body.product.details = data.details.map((item) => {
        return {
          id: item.id as string,
          stock: item.stock,
          color: item.color,
          price: item.price,
        };
      });

      await this.productRepository.save(product.body.product);

      return { status: 204, message: statusMessages.fa['204'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async updateStatus(data: UpdateStatusProductDto) {
    try {
      const result = await this.productRepository.update(data.id, {
        status: data.status,
      });

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return { status: 204, message: statusMessages.fa['204'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async updateStock(data: UpdateStockProductDto) {
    try {
      const result = await this.productRepository.findOneBy({ id: data.id });

      if (!result) return new CustomException(statusMessages.fa['404'], 404);

      for (const item of result.details) {
        if (item.id !== data.product_detail_id) continue;

        item.stock -= +data.stock;

        await this.productRepository.save(result);

        return { status: 200, message: statusMessages.fa['200'], body: null };
      }

      return { status: 404, message: statusMessages.fa['404'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
