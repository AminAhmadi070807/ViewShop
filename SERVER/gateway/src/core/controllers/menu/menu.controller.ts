import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { MenuDto } from './menu.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import { Public } from '../../../common/decorators/public.decorator';

@Controller('core/menus')
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
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

  @Get()
  @Public()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findAll() {
    return this.coreService.send('MENU:FIND');
  }

  @Get(':id')
  @Public()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  findOne(@Param() data: ValidateUUID) {
    return this.coreService.send('MENU:ONE', data);
  }
}
