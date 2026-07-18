import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NewsletterService } from './newsletter.service';
import { NewsletterDto } from './dto/newsletter.dto';
import { ValidateUUID } from '../../common/validations/id.dto';

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
  remove(@Payload() data: ValidateUUID) {
    return this.newsletterService.remove(data.id);
  }
}
