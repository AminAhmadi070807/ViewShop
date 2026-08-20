import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { SmDto, SmSettingDto } from './sms.dto';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('core/sms')
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiForbiddenResponse({ description: statusMessages.fa['403'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class SmsController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'SMS',
      enum: ['SMS'],
    },
    {
      name: 'permission',
      required: true,
      example: 'CREATE',
      enum: ['CREATE'],
    },
  ])
  sms(@Body() data: SmDto) {
    return this.coreService.send('SMS:SEND', data);
  }

  @Get()
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'SMS',
      enum: ['SMS'],
    },
    {
      name: 'permission',
      required: true,
      example: 'READ',
      enum: ['READ'],
    },
  ])
  findAll() {
    return this.coreService.send('SMS:FIND');
  }

  @Post('setting')
  sms_setting(@Body() data: SmSettingDto) {
    return this.coreService.send('SMS:SETTING', data);
  }

  @Get('setting')
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'SMS',
      enum: ['SMS'],
    },
    {
      name: 'permission',
      required: true,
      example: 'READ',
      enum: ['READ'],
    },
  ])
  findSetting() {
    return this.coreService.send('SMS:SETTING:FIND');
  }
}
