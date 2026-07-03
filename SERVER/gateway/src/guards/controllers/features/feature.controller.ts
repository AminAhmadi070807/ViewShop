import { Body, Controller, Post } from '@nestjs/common';
import { GuardsService } from '../../guards.service';
import { ValidateTitle } from '../../../common/validation/title.dto';
import {
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
  create(@Body() data: ValidateTitle) {
    return this.guardService.send('FEATURE:CREATE', data);
  }
}
