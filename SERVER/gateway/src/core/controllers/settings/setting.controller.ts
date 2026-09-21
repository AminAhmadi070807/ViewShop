import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { Setting } from './setting.dto';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('core/setting')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class SettingController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'SETTING', enum: ['SETTING'] },
    { name: 'permission', required: true, example: 'UPDATE', enum: ['UPDATE'] },
  ])
  setting(@Body() data: Setting) {
    return this.coreService.send('SETTING:UPDATE', data);
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'SETTING', enum: ['SETTING'] },
    { name: 'permission', required: true, example: 'READ', enum: ['READ'] },
  ])
  find() {
    return this.coreService.send('SETTING:FIND');
  }

  @Delete()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'SETTING', enum: ['SETTING'] },
    { name: 'permission', required: true, example: 'DELETE', enum: ['DELETE'] },
  ])
  empty() {
    return this.coreService.send('SETTING:EMPTY');
  }
}
