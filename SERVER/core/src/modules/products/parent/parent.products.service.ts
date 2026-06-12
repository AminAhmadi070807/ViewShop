import { Injectable } from '@nestjs/common';
import {
  ParentProductDto,
  UpdateParentProductDto,
} from '../dto/parent.product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ParentProduct } from '../entities/parent.product.entity';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../common/message/message.status';
import { Media } from '../../media/entities/media.entity';
import { CategoriesService } from '../../categories/category/categories.service';
import { SubCategoryService } from '../../categories/subCategory/sub.category.service';
import { AttributeService } from '../../categories/attribute/attribute.service';
import { RpcException } from '@nestjs/microservices';
import { MediaService } from '../../media/media.service';

@Injectable()
export class ParentProductsService {
  constructor(
    @InjectRepository(ParentProduct)
    private readonly productRepository: Repository<ParentProduct>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Media)
    private readonly mediaRepository: MediaService,
    private readonly categoryService: CategoriesService,
    private readonly subCategoryService: SubCategoryService,
    private readonly attributeService: AttributeService,
  ) {}

  async create(data: ParentProductDto) {
    try {
      // get user from database
      const user: User | null = await this.userRepository.findOneBy({
        id: data.userId,
      });

      // check user
      if (!user) return new CustomException(statusMessages.fa['404'], 404);

      // find product from database
      const existing: ParentProduct | null =
        await this.productRepository.findOneBy({
          alias: data.alias,
        });

      // existing product
      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      // get category from service
      const category = await this.categoryService.findOne(data.category);
      // get sub category from service
      const subCategory = await this.subCategoryService.findOne(
        data.subCategory,
      );
      // get medias from service
      const medias = await this.mediaRepository.findId(data.media);
      // get attributes from service
      const attributes = await this.attributeService.findId(data.attributes);

      // check category & sub category & medias error
      if (category instanceof RpcException) return category;
      else if (subCategory instanceof RpcException) return subCategory;
      else if (medias instanceof RpcException) return medias;
      else if (attributes instanceof RpcException) return attributes;

      // const product: ParentProduct = this.productRepository.create({
      //   user: user,
      //   category: category.body,
      //   subCategory: subCategory.body,
      //   medias: medias.body,
      //   attributes,
      //   title: data.title,
      //   alias: data.alias,
      //   description: data.description,
      //   product_type: data.product_type,
      //   max_price: data.max_price,
      //   min_price: data.min_price,
      //   minimum_quantity: data.minimum_quantity,
      //   return_policy_type: data.return_policy_type,
      //   tax_percent: data.tax_percent,
      //   warranty_type: data.warranty_type,
      // });

      // await this.productRepository.save(product);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const result: ParentProduct[] = await this.productRepository.find({
        order: {
          id: 'DESC',
        },
        relations: ['user'],
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: result,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const result: ParentProduct | null = await this.productRepository.findOne(
        {
          where: {
            id: id,
          },
          relations: ['user'],
        },
      );

      if (!result) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: result,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async update(data: UpdateParentProductDto) {
    try {
      const images = await this.mediaRepository.findId(data.medias);

      if (images instanceof RpcException) return images;

      await this.productRepository.update(
        { id: data.id },
        {
          ...data,
          medias: images.body,
        },
      );

      return {
        status: 204,
        message: statusMessages.fa['204'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      await this.productRepository.delete(id);

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
