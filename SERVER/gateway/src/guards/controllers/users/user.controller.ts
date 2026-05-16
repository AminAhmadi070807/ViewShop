import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { statusMessages } from '../../../common/messages/status.message';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import { UserDto } from './user.dto';

@Controller('guards/users')
@ApiBadRequestResponse({ description: statusMessages.fa['400'] })
@ApiUnauthorizedResponse({ description: statusMessages.fa['403'] })
@ApiNotFoundResponse({ description: statusMessages.fa['404'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class UserController {
  constructor(private readonly guardsService: GuardsService) {}

  @Post()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  create(@Req() req: express.Request) {
    const user: JwtPayload = req.user as JwtPayload;

    return this.guardsService.send('USER:CREATE', {
      role: user.role,
      id: user.userId,
    });
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findAll() {
    return this.guardsService.send('USER:FIND');
  }

  @Get(':id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  findOne(@Param() data: ValidateUUID) {
    return this.guardsService.send('USER:ONE', data);
  }

  @Patch()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  update(@Body() data: UserDto) {
    return this.guardsService.send('USER:UPDATE', data);
  }

  @Delete()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  removeRoleFromUser(@Body() data: UserDto) {
    return this.guardsService.send('USER:UPDATE', data);
  }
}
