import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { SmDto } from './sms.dto';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller()
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiForbiddenResponse({ description: statusMessages.fa['403'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class SmsController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiBadRequestResponse({ description: statusMessages.fa['200'] })
  sms(@Body() data: SmDto) {
    return this.coreService.send('SMS:SEND', data);
  }
}
