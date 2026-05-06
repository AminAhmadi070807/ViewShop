import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CoreService } from '../../core.service';
import { UserUpdateValidator, UserValidator } from './user.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ValidateUUID } from '../../../common/validation/uuid.dto';
import { PhoneDto } from '../../../common/validation/phone.dto';
import express from 'express';
import { Public } from '../../../common/decorators/public.decorator';

@Controller('core/users')
export class UsersController {
  constructor(private readonly coreService: CoreService) {}

  // send request to create user in core microservice
  @Public()
  @Post()
  @ApiCreatedResponse({
    description: 'User created successfully.',
    type: UserValidator,
  })
  @ApiConflictResponse({ description: 'This phone number already registered.' })
  @ApiBadRequestResponse({ description: 'Validation failed.' })
  create(@Body() data: UserValidator): Observable<unknown> {
    return this.coreService.send('USER:CREATE', data);
  }

  // send request to find all in core microservice
  @Get()
  @ApiOkResponse({ description: 'Find All users successfully.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  findAll(): Observable<unknown> {
    return this.coreService.send('USER:FIND');
  }

  // send request to find user by phone number in core microservice
  @Get('by/phone/:phone')
  @ApiOkResponse({ description: 'Find All users successfully.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @ApiOperation({ description: 'get user by phone number.' })
  @ApiParam({
    name: 'phone',
    required: true,
    type: 'string',
    description: 'User phone number',
  })
  findByPhone(@Param() param: PhoneDto): Observable<unknown> {
    return this.coreService.send('USER:PHONE', param.phone);
  }

  // send request to find one user in core microservice
  @Get(':id')
  @ApiOkResponse({ description: 'Find One user successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @ApiOperation({ description: 'get user by id.' })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    description: 'User uuid',
  })
  findOne(@Param() id: ValidateUUID): Observable<unknown> {
    return this.coreService.send('USER:ONE', id.id);
  }

  // send request to update user information with userId in core microservice
  @Patch('update/:id')
  @ApiOkResponse({ description: 'update user successfully.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @ApiOperation({ description: 'get user by id.' })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    description: 'User uuid',
  })
  update(
    @Param() param: ValidateUUID,
    @Body() data: UserUpdateValidator,
  ): Observable<unknown> {
    return this.coreService.send('USER:UPDATE', {
      id: param.id,
      fullName: data.fullName,
    });
  }

  // send request to remove user with userId in core microservice
  @Delete('delete/:id')
  @ApiOkResponse({ description: 'update user successfully.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @ApiOperation({ description: 'get user by id.' })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'uuid',
    description: 'User uuid',
  })
  delete(@Param() param: ValidateUUID): Observable<unknown> {
    return this.coreService.send('USER:DELETE', param.id);
  }
}
