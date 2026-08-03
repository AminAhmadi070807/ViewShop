import { Injectable } from '@nestjs/common';
import {
  ParentProductDto,
  UpdateParentProductDto,
} from '../dto/parent.product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ParentProduct } from '../entities/parent.product.entity';
import { User } from '../../users/entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../common/message/message.status';
import { CategoriesService } from '../../categories/category/categories.service';
import { SubCategoryService } from '../../categories/subCategory/sub.category.service';
import { AttributeService } from '../../categories/attribute/attribute.service';
import { RpcException } from '@nestjs/microservices';
import { MediaService } from '../../media/media.service';
import { Product } from '../entities/product.entity';

@Injectable()
export class ParentProductsService {
  constructor(
    @InjectRepository(ParentProduct)
    private readonly parentProductRepository: Repository<ParentProduct>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mediaService: MediaService,
    private readonly categoryService: CategoriesService,
    private readonly subCategoryService: SubCategoryService,
    private readonly attributeService: AttributeService,
  ) {}

  async create(data: ParentProductDto) {
    try {
      // get user from database
      const user = await this.userRepository.findOneBy({
        id: data.userId,
      });

      // check user
      if (!user) return new CustomException(statusMessages.fa['404'], 404);

      // find product from database
      const existing = await this.parentProductRepository.findOneBy({
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
      const medias = await this.mediaService.findId(data.media);
      // get attributes from service
      const attributes = await this.attributeService.findId(data.attributes);

      // check category & sub category & medias error
      if (category instanceof RpcException) return category;
      if (subCategory instanceof RpcException) return subCategory;
      if (medias instanceof RpcException) return medias;
      if (attributes instanceof RpcException) return attributes;

      const product: ParentProduct = this.parentProductRepository.create({
        user: user,
        category: category.body,
        subCategories: [subCategory.body],
        medias: medias.body,
        attributes: attributes.body,
        title: data.title,
        alias: data.alias,
        description: data.description,
        product_type: data.product_type,
        minimum_quantity: data.minimum_quantity,
        return_policy_type: data.return_policy_type,
        tax_percent: data.tax_percent,
        warranty_type: data.warranty_type,
      });

      await this.parentProductRepository.save(product);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll(title?: string) {
    try {
      const result: ParentProduct[] = await this.parentProductRepository.find({
        where: {
          title: ILike(`%${title}%`),
        },
        order: {
          createdAt: 'DESC',
        },
        relations: ['user'],
        select: {
          id: true,
          user: {
            id: true,
            fullName: true,
          },
        },
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
      const result: ParentProduct | null =
        await this.parentProductRepository.findOne({
          where: {
            id: id,
          },
          relations: ['user'],
          select: {
            user: {
              id: true,
              fullName: true,
            },
          },
        });

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
      // get category from service
      const category = await this.categoryService.findOne(data.category);
      // get sub category from service
      const subCategory = await this.subCategoryService.findOne(
        data.subCategory,
      );
      // get medias from service
      const medias = await this.mediaService.findId(data.media);
      // get attributes from service
      const attributes = await this.attributeService.findId(data.attributes);

      // check category & sub category & medias error
      if (category instanceof RpcException) return category;
      else if (subCategory instanceof RpcException) return subCategory;
      else if (medias instanceof RpcException) return medias;
      else if (attributes instanceof RpcException) return attributes;

      await this.parentProductRepository.update(
        { id: data.id },
        {
          ...data,
          attributes: attributes.body,
          medias: medias.body,
          subCategory: subCategory.body,
          category: category.body,
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
      const product = await this.parentProductRepository.findOneBy({ id });

      if (!product) {
        return new CustomException(statusMessages.fa['404'], 404);
      } else {
        const existing = await this.productRepository.find({
          where: {
            parentProduct: { id },
          },
        });

        if (existing.length) {
          return new CustomException('امکان حذف محصول وجود ندارد', 409);
        }
      }

      await this.parentProductRepository.delete(id);

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
