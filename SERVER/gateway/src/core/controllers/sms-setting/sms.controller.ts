import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { SmSettingDto } from './sms.dto';
import {
  ApiForbiddenResponse,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('core/setting/sms')
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiForbiddenResponse({ description: statusMessages.fa['403'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class SmsSettingController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiHeaders([
    { name: 'feature', required: true, example: 'SMS', enum: ['SMS'] },
    { name: 'permission', required: true, example: 'CREATE', enum: ['CREATE'] },
  ])
  sms_setting(@Body() data: SmSettingDto) {
    return this.coreService.send('SMS:SETTING', data);
  }

  @Get()
  @ApiHeaders([
    { name: 'feature', required: true, example: 'SMS', enum: ['SMS'] },
    { name: 'permission', required: true, example: 'READ', enum: ['READ'] },
  ])
  findAll() {
    return this.coreService.send('SETTING:SMS:FIND');
  }
}
