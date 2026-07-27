import { Body, Controller, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { MenuDto } from './menu.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('core/menus')
export class MenusController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
  @ApiUnauthorizedResponse({ description: statusMessages.fa['403'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  create(@Body() data: MenuDto) {
    return this.coreService.send('MENU:CREATE', data);
  }
}
