import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GuardsService } from '../../guards.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import { SingularDto, UpdateSingularDto } from './singular.dto';

@ApiBadRequestResponse({ description: statusMessages.fa['400'] })
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiForbiddenResponse({ description: statusMessages.fa['403'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
@Controller('guards/singular')
export class SingularController {
  constructor(private readonly guardsService: GuardsService) {}

  @ApiCreatedResponse({ description: statusMessages.fa['201'] })
  @Post()
  create(@Body() data: SingularDto) {
    return this.guardsService.send('SINGULAR:CREATE', data);
  }

  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @Get()
  findAll() {
    return this.guardsService.send('SINGULAR:FIND');
  }

  @ApiOkResponse({ description: statusMessages.fa['204'] })
  @Patch('toggle/permission')
  togglePermission(@Body() data: UpdateSingularDto) {
    return this.guardsService.send('SINGULAR:TOGGLE:PERMISSION', data);
  }

  @ApiOkResponse({ description: statusMessages.fa['204'] })
  @Patch('toggle/role')
  toggleRole(@Body() data: UpdateSingularDto) {
    return this.guardsService.send('SINGULAR:TOGGLE:PERMISSION', data);
  }

  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @Delete(':id')
  remove(@Param() data: ValidateUUID) {
    return this.guardsService.send('SINGULAR:DELETE', data);
  }
}
