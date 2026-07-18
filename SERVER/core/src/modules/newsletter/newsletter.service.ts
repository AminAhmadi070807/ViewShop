import { Injectable } from '@nestjs/common';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';

@Injectable()
export class NewsletterService {
  create(data: CreateNewsletterDto) {
    return 'This action adds a new newsletter';
  }

  findAll() {
    return `This action returns all newsletter`;
  }

  remove(id: number) {
    return `This action removes a #${id} newsletter`;
  }
}
