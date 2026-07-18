import { Injectable } from '@nestjs/common';
import { NewsletterDto } from './dto/newsletter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Newsletter } from './entities/newsletter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectRepository(Newsletter)
    private readonly newsletterRepository: Repository<Newsletter>,
  ) {}

  create(data: NewsletterDto) {}

  findAll() {}

  remove(id: number) {}
}
