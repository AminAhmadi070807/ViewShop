import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NewsletterService } from './newsletter.service';
import { NewsletterDto } from './dto/newsletter.dto';
import { Validate } from '../../common/validations/validate.dto';
import { PageFilter } from '../../common/filters/page.filter';

@Controller()
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @MessagePattern('NEWSLETTER:CREATE')
  create(@Payload() data: NewsletterDto) {
    return this.newsletterService.create(data);
  }

  @MessagePattern('NEWSLETTER:FIND')
  findAll(@Payload() data: PageFilter) {
    return this.newsletterService.findAll(data.page);
  }

  @MessagePattern('NEWSLETTER:DELETE')
  remove(@Payload() data: Validate) {
    return this.newsletterService.remove(data.id);
  }
}
