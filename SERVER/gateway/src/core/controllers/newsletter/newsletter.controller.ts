import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { NewsletterDto } from './newsletter.dto';
import { Public } from '../../../common/decorators/public.decorator';

@Controller('core/newsletter')
export class NewsletterController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @Public()
  create(@Body() data: NewsletterDto) {
    return this.coreService.send('NEWSLETTER:CREATE', data);
  }
}
