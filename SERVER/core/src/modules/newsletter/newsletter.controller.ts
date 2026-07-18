import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NewsletterService } from './newsletter.service';
import { NewsletterDto } from './dto/newsletter.dto';

@Controller()
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @MessagePattern('NEWSLETTER:CREATE')
  create(@Payload() data: NewsletterDto) {
    return this.newsletterService.create(data);
  }

  @MessagePattern('NEWSLETTER:FIND')
  findAll() {
    return this.newsletterService.findAll();
  }

  @MessagePattern('NEWSLETTER:REMOVE')
  remove(@Payload() id: number) {
    return this.newsletterService.remove(id);
  }
}
