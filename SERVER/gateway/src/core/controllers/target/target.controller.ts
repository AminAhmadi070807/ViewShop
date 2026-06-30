import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { TargetDto } from './target.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('core/target')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
@ApiUnauthorizedResponse({ description: statusMessages.fa['403'] })
export class TargetController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiForbiddenResponse({ description: statusMessages.fa['403'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  create(@Body() data: TargetDto) {
    return this.coreService.send('TARGET:CREATE', data);
  }

  @Get()
  findAll() {
    return this.coreService.send('TARGET:FIND');
  }
}
