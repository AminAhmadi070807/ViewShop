import { Injectable } from '@nestjs/common';
import {
  ParentProductDto,
  UpdateParentProductDto,
} from '../dto/parent.product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ParentProduct } from '../entities/parent.product.entity';
import { User } from '../../users/entities/user.entity';
import { In, Repository } from 'typeorm';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../common/message/message.status';
import { Media } from '../../media/entities/media.entity';
import { CategoriesService } from '../../categories/category/categories.service';
import { SubCategoryService } from '../../categories/subCategory/sub.category.service';
import { AttributeService } from '../../categories/attribute/attribute.service';

@Injectable()
export class ParentProductsService {
  constructor(
    @InjectRepository(ParentProduct)
    private readonly productRepository: Repository<ParentProduct>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    private readonly categoryService: CategoriesService,
    private readonly subCategoryService: SubCategoryService,
    private readonly attributeService: AttributeService,
  ) {}

  async create(data: ParentProductDto) {
    try {
      const user: User | null = await this.userRepository.findOneBy({
        id: data.userId,
      });

      if (!user) return new CustomException(statusMessages.fa['404'], 404);

      const existing: ParentProduct | null =
        await this.productRepository.findOneBy({
          alias: data.alias,
        });

      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const product: ParentProduct = this.productRepository.create({
        user: user,
      });

      await this.productRepository.save(product);

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
      const images: Media[] = await this.mediaRepository.find({
        where: {
          id: In(data.medias),
        },
      });

      await this.productRepository.update(
        { id: data.id },
        {
          ...data,
          medias: images,
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
