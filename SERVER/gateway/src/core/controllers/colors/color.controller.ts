import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CoreService } from '../../core.service';
import { ColorDto } from './color.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiHeaders,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import { ValidateTitle } from '../../../common/validation/title.dto';

@Controller('core/colors')
export class ColorController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['403'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'COLOR',
      enum: ['COLOR'],
    },
    {
      name: 'permission',
      required: true,
      example: 'CREATE',
      enum: ['CREATE'],
    },
  ])
  create(@Body() data: ColorDto) {
    return this.coreService.send('COLOR:CREATE', data);
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['403'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'USER',
      enum: ['USER'],
    },
    {
      name: 'permission',
      required: true,
      example: 'READ',
      enum: ['READ'],
    },
  ])
  findAll() {
    return this.coreService.send('COLOR:FIND');
  }

  @Get('/search')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  search(@Query() data: ValidateTitle) {
    return this.coreService.send('COLOR:SEARCH', data);
  }

  @Get('/:id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'USER',
      enum: ['USER'],
    },
    {
      name: 'permission',
      required: true,
      example: 'READ:ONE',
      enum: ['READ:ONE'],
    },
  ])
  findOne(@Param() data: ValidateUUID) {
    return this.coreService.send('COLOR:ONE', data);
  }

  @Delete()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'USER',
      enum: ['USER'],
    },
    {
      name: 'permission',
      required: true,
      example: 'DELETE',
      enum: ['DELETE'],
    },
  ])
  remove(@Body() data: ValidateUUID) {
    return this.coreService.send('COLOR:DELETE', data);
  }
}
