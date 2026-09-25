import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { GuardsService } from '../../guards.service';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiHeaders,
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
@ApiUnauthorizedResponse({ description: statusMessages.fa['401'] })
@ApiInternalServerErrorResponse({ description: statusMessages.fa['500'] })
export class UserController {
  constructor(private readonly guardsService: GuardsService) {}

  @Post()
  @ApiOkResponse({ description: statusMessages.fa['201'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'USERS', enum: ['USERS'] },
    { name: 'permission', required: true, example: 'CREATE', enum: ['CREATE'] },
  ])
  create(@Body() data: ValidateUUID, is_test: boolean = false) {
    return this.guardsService.send('USER:CREATE', { is_test, ...data });
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiConflictResponse({ description: statusMessages.fa['409'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'USERS', enum: ['USERS'] },
    { name: 'permission', required: true, example: 'READ', enum: ['READ'] },
  ])
  findAll() {
    return this.guardsService.send('USER:FIND');
  }

  @Get(':id')
  @ApiOkResponse({ description: statusMessages.fa['200'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'USERS',
      enum: ['USERS'],
    },
    {
      name: 'permission',
      required: true,
      example: 'READ:ONE',
      enum: ['READ:ONE'],
    },
  ])
  findOne(@Param() data: ValidateUUID) {
    return this.guardsService.send('USER:ONE', data);
  }

  @Patch()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiBadRequestResponse({ description: statusMessages.fa['400'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'USERS',
      enum: ['USERS'],
    },
    {
      name: 'permission',
      required: true,
      example: 'TOGGLE:ROLE',
      enum: ['TOGGLE:ROLE'],
    },
  ])
  updateRole(@Body() data: UserDto) {
    return this.guardsService.send('USER:TOGGLE:ROLE', data);
  }

  @Put()
  @ApiNoContentResponse({ description: statusMessages.fa['204'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    {
      name: 'feature',
      required: true,
      example: 'USERS',
      enum: ['USERS'],
    },
    {
      name: 'permission',
      required: true,
      example: 'TOGGLE:BAN',
      enum: ['TOGGLE:BAN'],
    },
  ])
  toggleBanned(@Body() data: ValidateUUID) {
    return this.guardsService.send('USER:TOGGLE:BANNED', data);
  }

  @Get()
  @ApiOkResponse({ description: statusMessages.fa['204'] })
  @ApiNotFoundResponse({ description: statusMessages.fa['404'] })
  @ApiHeaders([
    { name: 'feature', required: true, example: 'USERS', enum: ['USERS'] },
    { name: 'permission', required: true, example: 'DELETE', enum: ['DELETE'] },
  ])
  remove(@Body() data: ValidateUUID) {
    return this.guardsService.send('USER:DELETE', data);
  }
}
