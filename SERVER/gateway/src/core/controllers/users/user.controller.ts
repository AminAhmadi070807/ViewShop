import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CoreService } from '../../core.service';
import { UserValidator } from './user.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ValidateUUID } from '../../../common/validation/uuid.dto';

@Controller('core/users')
export class UsersController {
  constructor(private readonly coreService: CoreService) {}

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

  @Get()
  @ApiOkResponse({ description: 'Find All users successfully.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  findAll(): Observable<unknown> {
    return this.coreService.send('USER:FIND');
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Find One user successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  findOne(@Param() id: ValidateUUID): Observable<unknown> {
    return this.coreService.send('USER:ONE', id.id);
  }

  @Patch(':id')
  update(
    @Param() param: ValidateUUID,
    @Body() data: UserValidator,
  ): Observable<unknown> {
    return this.coreService.send('USER:UPDATE', { id: param.id, ...data });
  }
}
