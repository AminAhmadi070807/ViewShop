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

  findAll() {}

  remove(id: number) {}
}
