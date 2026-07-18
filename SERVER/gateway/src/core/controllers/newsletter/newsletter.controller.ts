import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { NewsletterDto } from './newsletter.dto';
import { Public } from '../../../common/decorators/public.decorator';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';
import { ValidateUUID } from '../../../common/validation/uuid.dto';

@Controller('core/newsletter')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class NewsletterController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @Public()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  create(@Body() data: NewsletterDto) {
    return this.coreService.send('NEWSLETTER:CREATE', data);
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findAll() {
    return this.coreService.send('NEWSLETTER:FIND');
  }

  @Delete()
  remove(@Body() data: ValidateUUID) {
    return this.coreService.send('NEWSLETTER:DELETE', data);
  }
}
