import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CoreService } from '../../core.service';
import { SmsSettingDto, UpdateSmsSettingDto } from './sms.setting.dto';
import {
  ApiForbiddenResponse,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import { Public } from '../../../common/decorators/public.decorator';

@Controller('core/setting/sms')
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiForbiddenResponse({ description: statusMessages.fa['403'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class SmsSettingController {
  constructor(private readonly coreService: CoreService) {}

  @Public()
  @Post()
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'SMS:SETTING',
      enum: ['SMS:SETTING'],
    },
    { name: 'permission', required: true, example: 'CREATE', enum: ['CREATE'] },
  ])
  sms_setting(@Body() data: SmsSettingDto) {
    return this.coreService.send('SETTING:SMS:CREATE', data);
  }

  @Get()
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'SMS:SETTING',
      enum: ['SMS:SETTING'],
    },
    { name: 'permission', required: true, example: 'READ', enum: ['READ'] },
  ])
  findAll() {
    return this.coreService.send('SETTING:SMS:FIND');
  }

  @Get(':id')
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'SMS:SETTING',
      enum: ['SMS:SETTING'],
    },
    { name: 'permission', required: true, example: 'READ', enum: ['READ:ONE'] },
  ])
  findOne(@Param() data: ValidateUUID) {
    return this.coreService.send('SETTING:SMS:ONE', data);
  }

  @Patch()
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'SMS:SETTING',
      enum: ['SMS:SETTING'],
    },
    { name: 'permission', required: true, example: 'READ', enum: ['UPDATE'] },
  ])
  update(@Body() data: UpdateSmsSettingDto) {
    return this.coreService.send('SETTING:SMS:UPDATE', data);
  }

  @Put()
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'SMS:SETTING',
      enum: ['SMS:SETTING'],
    },
    { name: 'permission', required: true, example: 'READ', enum: ['UPDATE'] },
  ])
  updateActivate(@Body() data: ValidateUUID) {
    return this.coreService.send('SETTING:SMS:UPDATE:ACTIVATE', data);
  }

  @Delete()
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'SMS:SETTING',
      enum: ['SMS:SETTING'],
    },
    { name: 'permission', required: true, example: 'DELETE', enum: ['DELETE'] },
  ])
  delete(@Body() data: ValidateUUID) {
    return this.coreService.send('SETTING:SMS:DELETE', data);
  }
}
