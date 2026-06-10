import { Injectable } from '@nestjs/common';
import { AttributeCategoryDto } from '../dto/attribute.category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute } from '../entities/attribute.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../../common/message/message.status';
import { SubCategory } from '../entities/sub.category.entity';
import { Media } from '../../media/entities/media.entity';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(Attribute)
    private readonly attributeRepository: Repository<Attribute>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  async create(data: AttributeCategoryDto) {
    try {
      // find sub category from database
      const subCategory: SubCategory | null =
        await this.subCategoryRepository.findOneBy({ id: data.subCategory });
      const media: Media | null = await this.mediaRepository.findOneBy({
        id: data.icon,
      });

      // check sub category
      if (!subCategory || !media) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      // find attribute from database
      const existing: Attribute | null = await this.attributeRepository.findOne(
        {
          where: [
            { subCategory: { id: data.subCategory }, alias: data.alias },
            { subCategory: { id: data.subCategory }, alias: data.title },
          ],
        },
      );

      // check attribute
      if (existing) return new CustomException(statusMessages.fa['409'], 409);

      const attribute: Attribute = this.attributeRepository.create({
        alias: data.alias,
        user: {
          id: data.user,
        },
        subCategory: {
          id: data.subCategory,
        },
        title: data.title,
        icon: media,
      });

      const newAttribute = await this.attributeRepository.save(attribute);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: {
          id: newAttribute.id,
        },
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll() {
    try {
      const attributes: Attribute[] = await this.attributeRepository.find({
        relations: ['icon'],
        order: {
          id: 'DESC',
        },
        select: {
          icon: {
            id: true,
            path: true,
            title: true,
          },
          title: true,
          alias: true,
          id: true,
        },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: attributes,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findOne(id: string) {
    try {
      const attribute: Attribute | null =
        await this.attributeRepository.findOne({
          where: {
            id,
          },
          order: {
            id: 'DESC',
          },
          select: {
            icon: {
              id: true,
              path: true,
              title: true,
            },
            title: true,
            alias: true,
            id: true,
          },
        });

      if (!attribute) return new CustomException(statusMessages.fa['404'], 404);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: attribute,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async delete(id: string) {
    try {
      await this.attributeRepository.delete(id);

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
