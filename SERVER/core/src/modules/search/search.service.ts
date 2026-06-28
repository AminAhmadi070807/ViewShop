import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Search } from './entities/search.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';
import { ParentProductsService } from '../products/parent/parent.products.service';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Search)
    private readonly searchRepository: Repository<Search>,
    private readonly parentProductService: ParentProductsService,
  ) {}

  async findAll() {
    try {
      const search: Search[] = await this.searchRepository.find({
        order: {
          numberOfSearch: 'DESC',
        },
        skip: 15,
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

  search(search: string) {}

  remove(id: number) {
    return `This action removes a #${id} search`;
  }
}
