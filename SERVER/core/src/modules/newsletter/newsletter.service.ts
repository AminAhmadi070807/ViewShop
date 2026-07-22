import { Injectable } from '@nestjs/common';
import { NewsletterDto } from './dto/newsletter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Newsletter } from './entities/newsletter.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { statusMessages } from '../../common/message/message.status';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectRepository(Newsletter)
    private readonly newsletterRepository: Repository<Newsletter>,
  ) {}

  async create(data: NewsletterDto) {
    try {
      const existing = await this.newsletterRepository.findOneBy(data);

      if (existing) return new CustomException(statusMessages.fa['201'], 201);

      const result = this.newsletterRepository.create(data);

      await this.newsletterRepository.save(result);

      return {
        status: 201,
        message: statusMessages.fa['201'],
        body: null,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async findAll(page: number = 1) {
    try {
      const newsletters = await this.newsletterRepository.find({
        take: (page ?? 1) * 15,
        order: {
          createdAt: 'DESC',
        },
      });

      return {
        status: 200,
        message: statusMessages.fa['200'],
        body: newsletters,
      };
    } catch {
      throw new CustomException(statusMessages.fa['500'], 500);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.newsletterRepository.delete(id);

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
