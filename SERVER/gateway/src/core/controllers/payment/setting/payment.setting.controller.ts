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
import { CoreService } from '../../../core.service';
import {
  PaymentSettingDto,
  UpdatePaymentSettingDto,
} from './payment.setting.dto';
import { ValidateUUID } from '../../../../common/validation/uuid.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../../common/messages/status.message';

@Controller('core/settings/payment')
@ApiBadRequestResponse({ description: statusMessages.fa['400'] })
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class PaymentSettingController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'PAYMENT:SETTING',
      enum: ['PAYMENT:SETTING'],
    },
    { name: 'permission', required: true, example: 'CREATE', enum: ['CREATE'] },
  ])
  create(@Body() data: PaymentSettingDto) {
    return this.coreService.send('SETTING:PAYMENT:CREATE', data);
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'PAYMENT:SETTING',
      enum: ['PAYMENT:SETTING'],
    },
    {
      name: 'permission',
      required: true,
      example: 'READ',
      enum: ['READ'],
    },
  ])
  findAll() {
    return this.coreService.send('SETTING:PAYMENT:FIND');
  }

  @Get(':id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'PAYMENT:SETTING',
      enum: ['PAYMENT:SETTING'],
    },
    {
      name: 'permission',
      required: true,
      example: 'READ:ONE',
      enum: ['READ:ONE'],
    },
  ])
  findOne(@Param() data: ValidateUUID) {
    return this.coreService.send('SETTING:PAYMENT:ONE', data);
  }

  @Patch()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'PAYMENT:SETTING',
      enum: ['PAYMENT:SETTING'],
    },
    { name: 'permission', required: true, example: 'UPDATE', enum: ['UPDATE'] },
  ])
  update(@Body() data: UpdatePaymentSettingDto) {
    return this.coreService.send('SETTING:PAYMENT:UPDATE', data);
  }

  @Put()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'PAYMENT:SETTING',
      enum: ['PAYMENT:SETTING'],
    },
    {
      name: 'permission',
      required: true,
      example: 'UPDATE:STATUS',
      enum: ['UPDATE:STATUS'],
    },
  ])
  updateStatus(@Body() data: ValidateUUID) {
    return this.coreService.send('SETTING:PAYMENT:UPDATE:STATUS', data);
  }

  @Delete()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'PAYMENT:SETTING',
      enum: ['PAYMENT:SETTING'],
    },
    { name: 'permission', required: true, example: 'DELETE', enum: ['DELETE'] },
  ])
  remove(@Body() data: ValidateUUID) {
    return this.coreService.send('SETTING:PAYMENT:DELETE', data);
  }
}
