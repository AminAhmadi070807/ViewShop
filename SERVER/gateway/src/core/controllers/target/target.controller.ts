import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { TargetDto } from './target.dto';
import { ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('core/target')
export class TargetController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  create(@Body() data: TargetDto) {
    return this.coreService.send('TARGET:CREATE', data);
  }
}
