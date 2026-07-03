import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { GuardsService } from '../../guards.service';
import { ValidateTitle } from '../../../common/validation/title.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import { UpdateFeatureDto } from './feature.dto';

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
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findAll() {
    return this.guardService.send('FEATURE:FIND');
  }

  @Get('/:id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiOkResponse({ description: statusMessages.fa['404'] })
  findOne(@Param() data: ValidateUUID) {
    return this.guardService.send('FEATURE:ONE', data);
  }

  @Patch()
  update(@Body() data: UpdateFeatureDto) {
    return this.guardService.send('FEATURE:UPDATE', data);
  }
}
