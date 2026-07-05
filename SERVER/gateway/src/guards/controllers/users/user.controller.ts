import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { GuardsService } from '../../guards.service';
import express from 'express';
import { JwtPayload } from '../../../common/validation/jwt.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import { UserDto } from './user.dto';

@Controller('guards/users')
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class UserController {
  constructor(private readonly guardsService: GuardsService) {}

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  findAll() {
    return this.guardsService.send('USER:FIND');
  }

  @Get(':id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  findOne(@Param() data: ValidateUUID) {
    return this.guardsService.send('USER:ONE', data);
  }

  @Patch()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  updateRole(@Body() data: UserDto) {
    return this.guardsService.send('USER:TOGGLE:ROLE', data);
  }

  @Put()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  toggleBanned(@Body() data: ValidateUUID) {
    return this.guardsService.send('USER:TOGGLE:BANNED', data);
  }
}
