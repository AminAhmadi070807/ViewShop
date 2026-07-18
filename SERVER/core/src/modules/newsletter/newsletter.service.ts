import { Injectable } from '@nestjs/common';
import { NewsletterDto } from './dto/newsletter.dto';

@Injectable()
export class NewsletterService {
  create(data: NewsletterDto) {}

  findAll() {}

  remove(id: number) {}
}
