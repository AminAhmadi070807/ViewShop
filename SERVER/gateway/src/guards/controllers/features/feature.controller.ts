import { Body, Controller, Get, Post } from '@nestjs/common';
import { GuardsService } from '../../guards.service';
import { ValidateTitle } from '../../../common/validation/title.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';

@Controller('guard/feature')
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiForbiddenResponse({ description: statusMessages.fa['403'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class FeatureController {
  constructor(private readonly guardService: GuardsService) {}

  @Post()
  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  create(@Body() data: ValidateTitle) {
    return this.guardService.send('FEATURE:CREATE', data);
  }

  @Get()
  findAll() {
    return this.guardService.send('FEATURE:FIND');
  }
}
