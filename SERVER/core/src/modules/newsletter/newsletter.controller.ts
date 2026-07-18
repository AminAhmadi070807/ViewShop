import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NewsletterService } from './newsletter.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';

@Controller()
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @MessagePattern('createNewsletter')
  create(@Payload() createNewsletterDto: CreateNewsletterDto) {
    return this.newsletterService.create(createNewsletterDto);
  }

  @MessagePattern('findAllNewsletter')
  findAll() {
    return this.newsletterService.findAll();
  }

  @MessagePattern('findOneNewsletter')
  findOne(@Payload() id: number) {
    return this.newsletterService.findOne(id);
  }

  @MessagePattern('updateNewsletter')
  update(@Payload() updateNewsletterDto: UpdateNewsletterDto) {
    return this.newsletterService.update(updateNewsletterDto.id, updateNewsletterDto);
  }

  @MessagePattern('removeNewsletter')
  remove(@Payload() id: number) {
    return this.newsletterService.remove(id);
  }
}
