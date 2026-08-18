import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { SmDto } from './sms.dto';
import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class SmsController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  sms(@Body() data: SmDto) {
    return this.coreService.send('SMS:SEND', data);
  }
}
