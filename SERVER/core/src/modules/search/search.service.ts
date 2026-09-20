import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Search } from './entities/search.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { ProductFilterDto } from './dto/search.dto';
import { ProductService } from '../products/product.service';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Search)
    private readonly searchRepository: Repository<Search>,
    private readonly productService: ProductService,
  ) {}

  async findAll(page: number = 1) {
    try {
      const search: Search[] = await this.searchRepository.find({
        take: (page ?? 1) * 15,
        order: { numberOfSearch: 'DESC' },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: search,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async search(data: ProductFilterDto) {
    try {
      const existing = await this.searchRepository.findOneBy({
        search: data.title,
      });

      let search_id: string;

      if (existing) {
        existing.numberOfSearch = +existing.numberOfSearch + 1;

        await this.searchRepository.save(existing);

        search_id = existing.id;
      } else {
        const newSearch: Search = this.searchRepository.create({
          numberOfSearch: 1,
          search: data.title?.trim(),
        });

        await this.searchRepository.save(newSearch);

        search_id = newSearch.id;
      }

      const productResult = await this.productService.findAll(data);

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: {
          id: search_id,
          products: productResult.body,
        },
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      const result: DeleteResult = await this.searchRepository.delete(id);

      if (!result.affected) {
        return new CustomException(statusMessages.fa['404'], 404);
      }

      return { status: 204, message: statusMessages.fa['204'], body: null };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }
}
