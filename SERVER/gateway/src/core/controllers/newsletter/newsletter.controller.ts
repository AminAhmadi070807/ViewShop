import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { NewsletterDto } from './newsletter.dto';
import { Public } from '../../../common/decorators/public.decorator';
import { ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('core/newsletter')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class NewsletterController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @Public()
  @ApiOkResponse({ description: statusMessages.fa['201'] })
  create(@Body() data: NewsletterDto) {
    return this.coreService.send('NEWSLETTER:CREATE', data);
  }

  @Get()
  findAll() {
    return this.coreService.send('NEWSLETTER:FIND');
  }
}
