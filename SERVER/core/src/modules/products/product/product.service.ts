import { Injectable } from '@nestjs/common';
import {
  ProductDto,
  UpdateProductDto,
  UpdateStatusProductDto,
} from '../dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../common/message/message.status';
import { ParentProduct } from '../entities/parent.product.entity';
import { MediaService } from '../../media/media.service';
import { RpcException } from '@nestjs/microservices';
import { StoreService } from '../../store/store.service';
import { ProductStatusEnum } from '../../../common/enums/products/product/status.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ParentProduct)
    private readonly parentProductRepository: Repository<ParentProduct>,
    private readonly mediaService: MediaService,
    private readonly storeService: StoreService,
  ) {}

  async create(data: ProductDto) {
    try {
      const existing: Product | null = await this.productRepository.findOne({
        where: {
          alias: data.alias,
        },
      });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const parentProduct: ParentProduct | null =
        await this.parentProductRepository.findOneBy({
          id: data.parentProductId,
        });

      if (!parentProduct) {
        return new CustomException(statusMessages.fa['404'], 409);
      } else if (
        data.price < +parentProduct.min_price ||
        data.price > +parentProduct.max_price
      ) {
        return new CustomException(
          'لطفا قیمت را بر اساس قیمت تاین شده درج فرماید',
          400,
        );
      }

      const media = await this.mediaService.findId(data.medias);

      if (media instanceof RpcException) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const store = await this.storeService.findOne(data.store);

      if (store instanceof RpcException) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      const product: Product = this.productRepository.create({
        user: { id: data.userId },
        parentProduct: parentProduct,
        medias: media.body,
        alias: data.alias,
        price: data.price,
        store: store.body,
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
        order: {
          createdAt: 'DESC',
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
      const product: Product | null = await this.productRepository.findOne({
        where: { id },
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

  async update(data: UpdateProductDto) {
    try {
      const medias = await this.mediaService.findId(data.medias);

      if (medias instanceof RpcException) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      await this.productRepository.update(data.id, {
        medias: medias.body,
        discount_percent: data.discount_percent,
        status: ProductStatusEnum.PENDING_APPROVAL,
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

  async updateStatus(data: UpdateStatusProductDto) {
    try {
      await this.productRepository.update(data.id, {
        status: data.status,
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
